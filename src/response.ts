import { ServerResponse } from "http";

export class TypeExpressResponse {
  constructor(private response: ServerResponse) {}

  send(message: string): void {
    this.response.setHeader("Content-Type", "text/plain");
    this.response.write(message);
    this.response.end();
  }
}
