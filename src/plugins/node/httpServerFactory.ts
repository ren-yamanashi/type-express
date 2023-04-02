import http from "http";
import {
  HttpRequest,
  HttpServer,
  HttpServerFactory,
  HttpServerResponseIncludeRequest,
} from "../../infrastructure/http.interface";

const getRequestBody = (
  req: http.IncomingMessage,
  headers: http.IncomingHttpHeaders
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const contentType = headers["content-type"];
    const chunks: Uint8Array[] = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      const buffer = Buffer.concat(chunks);
      if (contentType && contentType.includes("application/json")) {
        try {
          const jsonBody = JSON.parse(buffer.toString());
          resolve(jsonBody);
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(buffer);
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
};

export class NodeHttpServerFactory implements HttpServerFactory {
  createServer(
    requestListener: (
      req: HttpRequest,
      res: HttpServerResponseIncludeRequest
    ) => void
  ): HttpServer {
    const server = http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {
        const body = await getRequestBody(req, req.headers);

        const httpRequest: HttpRequest = {
          method: req.method || "",
          headers: req.headers as {},
          url: req.url || "",
          body,
        };

        const httpResponse: HttpServerResponseIncludeRequest = {
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
          req: httpRequest,
        };

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
