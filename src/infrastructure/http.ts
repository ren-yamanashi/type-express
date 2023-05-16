import http from "http";
import {
  CustomIncomingMessage,
  HttpRequest,
  HttpServer,
  HttpServerFactory,
  HttpServerResponseIncludeRequest,
} from "../interfaces/http";

export class Http implements HttpServerFactory {
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
    contentType: string | undefined
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];

      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      req.on("end", () => {
        const buffer: Buffer = Buffer.concat(chunks);
        if (contentType?.includes("application/json")) {
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
      req.on("error", (err: Error) => {
        reject(err);
      });
    });
  }

  private createHttpRequest(
    req: http.IncomingMessage,
    body: unknown
  ): HttpRequest {
    return {
      method: req.method || "",
      headers: req.headers as {},
      url: req.url || "",
      body,
    };
  }

  private createHttpResponse(
    req: HttpRequest,
    res: http.ServerResponse
  ): HttpServerResponseIncludeRequest {
    return {
      status: undefined,
      headers: {},
      setHeader: (key: string, value: string) => {
        res.setHeader(key, value);
      },
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
    requestListener: (
      req: HttpRequest,
      res: HttpServerResponseIncludeRequest
    ) => void
  ): HttpServer {
    const server = http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {
        const body: unknown = await this.getRequestBody(
          req,
          req.headers["content-type"]
        );
        const httpRequest: HttpRequest = this.createHttpRequest(req, body);
        const httpResponse: HttpServerResponseIncludeRequest =
          this.createHttpResponse(httpRequest, res);

        requestListener(httpRequest, httpResponse);
      }
    );
    return {
      listen: (port: number, callback?: () => void) => {
        server.listen(port, callback);
        return server;
      },
      close: (callback?: () => void) => server.close(callback),
      on: (event: string, callback: () => void) => {
        server.on(event, callback);
        return server;
      },
      emit: (event: string, ...args: any[]) => server.emit(event, ...args),
      once: (event: string, callback: () => void) => {
        server.once(event, callback);
        return server;
      },
    };
  }
}
