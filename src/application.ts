import http from "http";
import { GetMethodOptions, HttpServer } from "./types/http";

export interface Application {
  listen: (port: number, writeText: string) => void;
  get: (options: GetMethodOptions) => void;
}

export class TypeExpress implements Application {
  server: HttpServer;

  constructor() {
    this.server = http.createServer((req, res) => {
      if (req.method === "GET" && req.url === "/") {
        // NOTE: ブラウザで`http://localhost:8000`を開いたときは、自動的にこのリクエストが送られる
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Hello World!");
        res.end();
      }
    });
  }

  listen = (port: number) => {
    this.server.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  };

  get = (): void => {
    this.server.on("request", (req, res) => {
      if ((req.url === "/user", req.method === "GET")) {
        req.on("end", () => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("Get User");
          res.end();
        });
      }
    });
  };
}
