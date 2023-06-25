/**
 *
 * Request
 *
 */
export type HttpRequest = {
  method: string;
  headers: { [key: string]: string };
  url: string;
  body?: unknown;
};
export type CustomIncomingMessage = {
  on(event: 'data', listener: (chunk: Uint8Array) => void): void;
  on(event: 'end', listener: () => void): void;
  on(event: 'error', listener: (err: Error) => void): void;
  on(event: string, listener: typeof Function): void;
};

/**
 *
 * Response
 *
 */
type OutgoingHttpHeader = number | string | string[];
export type HttpResponse = {
  statusCode?: number;
  headers?: Record<string, string>;
  setHeader(key: string, value: string): void;
  getHeaders(): {
    [key: string]: OutgoingHttpHeader | undefined;
  };
  write(content: string | Uint8Array): void;
  end(chunk?: any): void;
  redirect(status: number, url: string): void;
};

/**
 *
 * Server
 *
 */
export type HttpServerResponseIncludeRequest = HttpResponse & {
  req: HttpRequest;
};
export interface Server<Request, Response> {
  listen(port: number, callback?: () => void): Server<Request, Response>;
  close(callback?: () => void): void;
  on(event: string, callback: () => void): Server<Request, Response>;
}
export interface HttpServerFactoryInterface {
  createServer(
    requestListener: (req: HttpRequest, res: HttpServerResponseIncludeRequest) => void,
  ): Server<HttpRequest, HttpResponse>;
}
