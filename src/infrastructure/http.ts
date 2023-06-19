/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import http from 'http';
import {
  CustomIncomingMessage,
  HttpRequest,
  HttpServerInterface,
  HttpServerFactoryInterface,
  HttpServerResponseIncludeRequest,
  Server,
} from '../interfaces/http';

export class HttpServerFactory implements HttpServerFactoryInterface {
  /**
   * Extracts the request body from the given request object and returns it as a Promise.
   * 与えられたリクエストオブジェクトからリクエストボディを抽出し、Promiseとして返す。
   *
   * @param {CustomIncomingMessage} req - The request object with a compatible `on` method for handling events.
   *                                      イベント処理用の互換性のある `on` メソッドを持つリクエストオブジェクト。
   * @param {string | undefined} contentType - The content type of the request.
   */
  private getRequestBody(
    req: CustomIncomingMessage,
    contentType: string | undefined,
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];

      req.on('data', (chunk) => {
        chunks.push(chunk);
      });
      req.on('end', () => {
        const buffer: Buffer = Buffer.concat(chunks);
        if (contentType?.includes('application/json')) {
          try {
            const jsonBody: unknown = JSON.parse(buffer.toString());
            resolve(jsonBody);
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(buffer);
        }
      });
      req.on('error', (err: Error) => {
        reject(err);
      });
    });
  }

  private createHttpRequest(req: http.IncomingMessage, body: unknown): HttpRequest {
    return {
      method: req.method || '',
      headers: req.headers as any,
      url: req.url || '',
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
      setHeader: (key: string, value: string) => {
        res.setHeader(key, value);
      },
      getHeaders: res.getHeaders,
      write: (content: string | Uint8Array) => {
        res.write(content);
      },
      end: () => {
        res.end();
      },
      redirect: (status: number, url: string) => {
        res.writeHead(status, { Location: url });
        res.end();
      },
      req,
    };
  }

  public createServer(
    requestListener: (req: HttpRequest, res: HttpServerResponseIncludeRequest) => void,
  ): HttpServerInterface {
    const server: Server<Request, Response> = http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {
        const body: unknown = await this.getRequestBody(req, req.headers['content-type']);
        const httpRequest: HttpRequest = this.createHttpRequest(req, body);
        const httpResponse: HttpServerResponseIncludeRequest = this.createHttpResponse(
          httpRequest,
          res,
        );

        requestListener(httpRequest, httpResponse);
      },
    );
    return new HttpServer(server);
  }
}

class HttpServer implements HttpServerInterface {
  constructor(private server: Server<Request, Response>) {}
  public listen(port: number, callback?: () => void): Server<Request, Response> {
    this.server.listen(port, callback);
    return this.server;
  }
  public close(callback?: () => void): void {
    this.server.close(callback);
  }
  public on(event: string, callback: () => void): Server<Request, Response> {
    this.server.on(event, callback);
    return this.server;
  }
  public emit(event: string, ...args: any[]): boolean {
    return this.server.emit(event, ...args);
  }
  public once(event: string, callback: () => void): Server<Request, Response> {
    this.server.once(event, callback);
    return this.server;
  }
}
