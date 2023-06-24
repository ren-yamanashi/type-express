import { ProcessInterface } from 'src/interfaces/process';
import { fileSystemKey, processKey, container } from '../../di';
import { safeExecute } from '../../helper/safeExecute';
import { FileSystemInterface } from '../../interfaces/fileSystem';
import { HttpResponse } from '../../interfaces/http';

export class ResponseFactory {
  public create({
    fileSystem = container.resolve(fileSystemKey),
    process = container.resolve(processKey),
    httpResponse,
  }: {
    readonly httpResponse: HttpResponse;
    readonly fileSystem?: FileSystemInterface;
    readonly process?: ProcessInterface;
  }): Response {
    return new Response(fileSystem, process, httpResponse);
  }
}

/**
 * Setting and getting response
 */
export class Response {
  constructor(
    private readonly fileSystem: FileSystemInterface,
    private readonly process: ProcessInterface,
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
   * This method will automatically set the appropriate Content-Type header based on the extension of the file being sent.
   * If you want to set a different Content-Type for a particular case, you can set the header manually using the `res.setHeader()` methods.
   * @param filePath
   */
  public async sendFile(filePath: string): Promise<void> {
    const { data, error } = await safeExecute(() =>
      this.fileSystem.readFile(`${this.process.cwd()}${filePath}`, 'utf8'),
    );
    if (error) {
      console.error(error);
      this.httpResponse.statusCode = 500;
      this.httpResponse.end(error.message);
    }
    this.httpResponse.statusCode = 200;
    // TODO: ファイル拡張子によって自動的にheaderの内容を変える https://github.com/ren-yamanashi/type-express/issues/45
    // TODO: ディレクトリだったらエラーを返す https://github.com/ren-yamanashi/type-express/issues/45
    this.httpResponse.setHeader('Content-Type', 'text/html');
    this.httpResponse.write(data ?? '');
    this.httpResponse.end();
  }
}
