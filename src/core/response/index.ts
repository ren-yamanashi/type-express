import { ProcessInterface } from 'src/interfaces/process';
import { fileSystemKey, processKey, container, pathKey } from '../../di';
import { safeExecute } from '../../helper/safeExecute';
import { FileSystemInterface } from '../../interfaces/fileSystem';
import { HttpResponse } from '../../interfaces/http';
import { PathInterface } from 'src/interfaces/path';
import { MIME_TYPES } from './constance';
import { MimeTypes } from './types';

export class ResponseFactory {
  public create({
    fileSystem = container.resolve(fileSystemKey),
    process = container.resolve(processKey),
    path = container.resolve(pathKey),
    httpResponse,
  }: {
    readonly httpResponse: HttpResponse;
    readonly fileSystem?: FileSystemInterface;
    readonly path?: PathInterface;
    readonly process?: ProcessInterface;
  }): Response {
    return new Response(fileSystem, process, path, httpResponse);
  }
}

/**
 * Setting and getting response
 */
export class Response {
  constructor(
    private readonly fileSystem: FileSystemInterface,
    private readonly process: ProcessInterface,
    private readonly path: PathInterface,
    private readonly httpResponse: HttpResponse,
  ) {}

  /**
   * Sets header information for http requests.
   * ex: res.setHeader({'Access-Control-Allow-Origin': '*'});
   * @param arg{[key: string]: string}
   */
  public setHeader(arg: { [key: string]: string }) {
    for (const key in arg) {
      this.httpResponse.setHeader(key, arg[key]);
    }
  }

  /**
   * Send arbitrary messages to the client.
   * Default header`s `Contents-Type` value  is `text/plain`
   * If you want to set the value, please specify it in the second argument
   *
   * ex: res.send('Hello World!');
   * @param message{string}
   */
  public send(message: string, contentType = 'text/plain'): void {
    this.httpResponse.setHeader('Content-Type', contentType);
    this.httpResponse.write(message);
    this.httpResponse.end();
  }

  /**
   * Send a arbitrary file to a client.
   * This method will automatically set the appropriate Content-Type header basedz on the extension of the file being sent.
   * If you want to set a different Content-Type for a particular case, you can set the header manually using the `res.setHeader()` methods.
   * @param filePath
   */
  public async sendFile(filePath: string): Promise<void> {
    const fullPath = `${this.process.cwd()}${filePath}`;
    // NOTE: check path is directory
    this.fileSystem.stat(fullPath, (err, stats) => {
      if (err) {
        console.error(err);
        this.httpResponse.statusCode = 500;
        this.httpResponse.write('Internal Server Error');
        this.httpResponse.end();
      }
      if (stats.isDirectory()) {
        this.httpResponse.statusCode = 400;
        this.httpResponse.write('Error: Path is a directory, not a file');
        this.httpResponse.end();
      }
    });

    const { data, error } = await safeExecute(() => this.fileSystem.readFile(fullPath, 'utf8'));
    if (error) {
      console.error(error);
      this.httpResponse.statusCode = 500;
      this.httpResponse.end(error.message);
    }
    this.httpResponse.statusCode = 200;
    const ext = this.path.extName(fullPath) as MimeTypes;
    const mimeType = MIME_TYPES[ext];
    if (mimeType) this.httpResponse.setHeader('Content-Type', mimeType);
    this.httpResponse.write(data ?? '');
    this.httpResponse.end();
  }
}
