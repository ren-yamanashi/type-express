/* eslint-disable @typescript-eslint/no-unsafe-return */
import http from 'http';
import {
  CustomIncomingMessage,
  HttpRequest,
  HttpServerResponseIncludeRequest,
  Server,
  HttpResponse,
  HttpServerFactoryInterface,
} from '../interfaces/http';

export class MockHttpServer implements Server<HttpRequest, HttpResponse> {
  listen(port: number, callback?: () => void): Server<Request, Response> {
    callback?.();
    return this as any;
  }

  close(callback?: () => void): void {
    callback?.();
  }

  on(event: string, callback: () => void): Server<Request, Response> {
    callback();
    return this as any;
  }

  emit(event: string, ...args: any[]): boolean {
    return true;
  }

  once(event: string, callback: () => void): Server<Request, Response> {
    callback();
    return this as any;
  }
}

export class MockHttpServerFactory implements HttpServerFactoryInterface {
  createServer(
    requestListener: (req: HttpRequest, res: HttpServerResponseIncludeRequest) => void,
  ): Server<HttpRequest, HttpResponse> {
    return new MockHttpServer();
  }

  private getRequestBody(
    req: CustomIncomingMessage,
    contentType: string | undefined,
  ): Promise<unknown> {
    return Promise.resolve({});
  }

  private createHttpRequest(req: http.IncomingMessage, body: unknown): HttpRequest {
    return {
      method: '',
      headers: {},
      url: '',
      body,
    };
  }

  private createHttpResponse(
    req: HttpRequest,
    res: http.ServerResponse,
  ): HttpServerResponseIncludeRequest {
    return {
      statusCode: undefined,
      headers: {},
      setHeader: (key: string, value: string) => {},
      getHeaders: () => ({}),
      write: (content: string | Uint8Array) => {},
      end: () => {},
      redirect: (status: number, url: string) => {},
      req,
    };
  }
}
