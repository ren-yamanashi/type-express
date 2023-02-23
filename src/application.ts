import http from "http";
import { Server, ServerResponse } from "./types/http";

export interface Application {
  listen: (port: number, writeText: string) => void;
  get: (message: string) => void;
}

export class TypeExpress implements Application {
  response!: string;

  listen = (port: number) => {
    const server = http.createServer((_: any, res: ServerResponse) => {
      // NOTE: Content-typeというヘッダー情報に値を設定
      res.writeHead(200, { "Content-Type": "text/plain" });
      // NOTE: ボディ部分のコンテンツを書き出し
      res.write(this.response);
      res.end();
    });
    server.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  };

  get = (message: string): void => {
    this.response = message;
  };
}
