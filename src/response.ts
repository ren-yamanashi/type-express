import { HttpResponse } from "./infrastructure/http.interface";


export class TypeExpressResponse {
  constructor(private response: HttpResponse) {}

  public send(message: string): void {
    this.response.setHeader("Content-Type", "text/plain");
    this.response.write(message);
    this.response.end();
  }
}
