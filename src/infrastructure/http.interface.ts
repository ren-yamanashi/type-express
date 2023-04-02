export interface HttpRequest {
  method: string;
  headers: { [key: string]: string };
  url: string;
  body?: any;
}

export interface HttpResponse {
  status?: number;
  headers?: Record<string, string>;
  setHeader(key: string, value: string): void;
  write(content: string | Uint8Array): void;
  end(): void;
  redirect(status: number, url: string): void;
}

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

// NOTE: 各プラットフォームのhttpメソッドは、このinterfaceに合わせる
export interface HttpServerFactory {
  createServer(
    requestListener: (
      req: HttpRequest,
      res: HttpServerResponseIncludeRequest
    ) => void
  ): HttpServer;
}
