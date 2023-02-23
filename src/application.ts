import http from "http";
import { RequestOptions, Server, ServerResponse } from "./types/http";

export interface Application {
  listen: (port: number, writeText: string) => void;
  get: (options: RequestOptions) => void;
}

export class TypeExpress implements Application {
  response!: string;
  private port!: number;

  listen = (port: number) => {
    this.port = port;
    const server = http.createServer((_: any, res: ServerResponse) => {
      // NOTE: Content-typeというヘッダー情報に値を設定
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Hello World!");
      res.end();
    });
    server.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  };

  get = (requestOptions: RequestOptions): void => {
    const request = http.request(
      { host: "localhost", port: this.port, ...requestOptions },
      (res) => {
        console.log(`Response status code: ${res.statusCode}`);
        console.log("Response headers: ", res.headers);
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          console.log(`Response body: ${chunk}`);
        });
      }
    );
    request.on("error", (error) => {
      console.error(`Request failed: ${error.message}`);
    });
    request.end();
  };
}
