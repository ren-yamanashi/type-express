/**
 *
 * Request
 *
 */
export interface HttpRequest {
  method: string;
  headers: { [key: string]: string };
  url: string;
  body?: any;
}
export interface CustomIncomingMessage {
  on(event: "data", listener: (chunk: Uint8Array) => void): void;
  on(event: "end", listener: () => void): void;
  on(event: "error", listener: (err: Error) => void): void;
  on(event: string, listener: Function): void;
}

/**
 *
 * Response
 *
 */
export interface HttpResponse {
  status?: number;
  headers?: Record<string, string>;
  setHeader(key: string, value: string): void;
  write(content: string | Uint8Array): void;
  end(): void;
  redirect(status: number, url: string): void;
}

/**
 *
 * Server
 *
 */
export interface Server<Request, Response> {
  listen(port: number, callback?: () => void): Server<Request, Response>;
  close(callback?: () => void): void;
  on(event: string, callback: () => void): Server<Request, Response>;
  emit(event: string, ...args: any[]): boolean;
  once(event: string, callback: () => void): Server<Request, Response>;
}
export interface HttpServer extends Server<HttpRequest, HttpResponse> {}
export interface HttpServerResponseIncludeRequest extends HttpResponse {
  req: HttpRequest;
}
export interface HttpServerFactory {
  createServer(
    requestListener: (
      req: HttpRequest,
      res: HttpServerResponseIncludeRequest
    ) => void
  ): HttpServer;
}
