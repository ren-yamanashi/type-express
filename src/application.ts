import http from "http";
import { GetMethodOptions, HttpServer } from "./types/http";

export interface Application {
  listen: (port: number, onSuccessMethod: () => void) => void;
  get: (path: string, handlers: { write: string }) => void;
}

/**
 * MEMO: get：serverの呼び出しはいらない。設定を書くだけ
 *      getで書いた設定を、createServerに反映する。
 *      その反映する際の分岐処理は、routerで制御する
 */
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

  listen(port: number, onSuccessMethod: () => void): void {
    this.server.listen(port, onSuccessMethod);
  }

  get(): void {
    this.server.on("request", (req, res) => {
      if ((req.url === "/user", req.method === "GET")) {
        req.on("end", () => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("Get User");
          res.end();
        });
      }
    });
  }
}
