import { Response } from '../core/responses';

export class MockResponse extends Response {
  public send(message: string): void {}
  public async sendFile(filePath: string): Promise<void> {}
}
