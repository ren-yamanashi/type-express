import { HttpResponse } from "./interfaces/http";


export class TypeExpressResponse {
  constructor(private response: HttpResponse) {}

  public send(message: string): void {
    this.response.setHeader("Content-Type", "text/plain");
    this.response.write(message);
    this.response.end();
  }
}
