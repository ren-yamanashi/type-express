/**
 *
 * Request
 *
 */
export interface HttpRequest {
  method: string;
  headers: { [key: string]: string };
  url: string;
  body?: unknown;
}
export interface CustomIncomingMessage {
  on(event: 'data', listener: (chunk: Uint8Array) => void): void;
  on(event: 'end', listener: () => void): void;
  on(event: 'error', listener: (err: Error) => void): void;
  on(event: string, listener: Function): void;
}

/**
 *
 * Response
 *
 */
type OutgoingHttpHeader = number | string | string[];
interface OutgoingHttpHeaders extends NodeJS.Dict<OutgoingHttpHeader> {}
export interface HttpResponse {
  statusCode?: number;
  headers?: Record<string, string>;
  setHeader(key: string, value: string): void;
  getHeaders(): OutgoingHttpHeaders;
  write(content: string | Uint8Array): void;
  end(chunk?: any): void;
  redirect(status: number, url: string): void;
}

/**
 *
 * Server
 *
 */
export const HTTP_STATE = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};
export type HttpState = (typeof HTTP_STATE)[keyof typeof HTTP_STATE];
export interface Server<Request, Response> {
  listen(port: number, callback?: () => void): Server<Request, Response>;
  close(callback?: () => void): void;
  on(event: string, callback: () => void): Server<Request, Response>;
  emit(event: string, ...args: any[]): boolean;
  once(event: string, callback: () => void): Server<Request, Response>;
}
export interface HttpServerResponseIncludeRequest extends HttpResponse {
  req: HttpRequest;
}
export interface HttpServerFactoryInterface {
  createServer(
    requestListener: (req: HttpRequest, res: HttpServerResponseIncludeRequest) => void,
  ): HttpServerInterface;
}
export interface HttpServerInterface extends Server<HttpRequest, HttpResponse> {
  state: string;
  updateState(httpState: HttpState): void;
}