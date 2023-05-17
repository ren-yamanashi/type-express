import { FileSystemKey, container } from './di';
import fs from 'fs';
import { safeExecute } from './helper/safeExecute';
import { FileSystem } from './interfaces/fileSystem';
import { HttpResponse } from './interfaces/http';

export class TypeExpressResponse {
  private readonly fileSystem: FileSystem;
  constructor(private httpResponse: HttpResponse) {
    this.fileSystem = container.resolve(FileSystemKey);
  }

  public send(message: string): void {
    this.httpResponse.setHeader('Content-Type', 'text/plain');
    this.httpResponse.write(message);
    this.httpResponse.end();
  }

  public async sendFile(filePath: string): Promise<void> {
    const { data, error } = await safeExecute(() =>
      this.fileSystem.readFile(`${process.cwd()}${filePath}`, 'utf8'),
    );
    if (error) {
      console.error(error);
      this.httpResponse.statusCode = 500;
      this.httpResponse.end(error.message);
      return;
    }
    this.httpResponse.statusCode = 200;
    this.httpResponse.setHeader('Content-Type', 'text/html');
    this.httpResponse.write(data ?? '');
    this.httpResponse.end();
    return;
  }
}
