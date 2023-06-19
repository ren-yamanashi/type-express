import { ProcessInterface } from 'src/interfaces/process';
import { FileSystemKey, ProcessKey, container } from '../di';
import { safeExecute } from '../helper/safeExecute';
import { FileSystemInterface } from '../interfaces/fileSystem';
import { HttpResponse } from '../interfaces/http';

export class ResponseFactory {
  public create(res: HttpResponse): Response {
    return new Response(res);
  }
}

export class Response {
  private readonly fileSystem: FileSystemInterface;
  private readonly process: ProcessInterface;

  constructor(private httpResponse: HttpResponse) {
    this.fileSystem = container.resolve(FileSystemKey);
    this.process = container.resolve(ProcessKey);
  }

  public send(message: string): void | Error {
    this.httpResponse.setHeader('Content-Type', 'text/plain');
    this.httpResponse.write(message);
    this.httpResponse.end();
  }

  public async sendFile(filePath: string): Promise<void | Error> {
    const { data, error } = await safeExecute(() =>
      this.fileSystem.readFile(`${this.process.cwd()}${filePath}`, 'utf8'),
    );
    if (error) {
      console.error(error);
      this.httpResponse.statusCode = 500;
      this.httpResponse.end(error.message);
    }
    this.httpResponse.statusCode = 200;
    // TODO: ファイル拡張子によって自動的にheaderの内容を変える
    // TODO: ディレクトリだったらエラーを返す
    this.httpResponse.setHeader('Content-Type', 'text/html');
    this.httpResponse.write(data ?? '');
    this.httpResponse.end();
  }
}
