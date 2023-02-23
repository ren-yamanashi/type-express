import http from "http";
import { App } from "./interface/app.interface";
import { ServerResponse } from "./types/http";

const listen = (port: number, listeningListener?: () => void): void => {
  const server = http.createServer((_: any, res: ServerResponse) => {
    // NOTE: Content-typeというヘッダー情報に「application.json」という値を設定
    res.writeHead(200, { "Content-Type": "application.json" });
    // NOTE: ボディ部分のコンテンツを書き出し
    res.write(
      JSON.stringify({
        data: "Hello World!",
      })
    );
    res.end();
  });
  server.listen(port, listeningListener);
};

export const app: App = {
  listen,
};
