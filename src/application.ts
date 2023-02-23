import http from "http";
import { GetMethodOptions, Server } from "./types/http";

export interface Application {
  listen: (port: number, writeText: string) => void;
  get: (options: GetMethodOptions) => void;
}

export class TypeExpress implements Application {
  private server!: Server;
  constructor() {
    this.server = http.createServer((req, res) => {
      // NOTE: ブラウザで`http://localhost:8000`を開いたときは、自動的にこのリクエストが送られる
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Hello World!");
      res.end();
    });
  }

  listen = (port: number) => {
    this.server.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  };

  get = (options: GetMethodOptions): void => {
    this.server.on("request", (req, res) => {
      if ((req.url === "/", req.method === "POST")) {
        const request = http.request(options, (response) => {
          let body = "";
          response.on("data", (chunk) => {
            body += chunk;
          });
          response.on("end", () => {
            console.log(body);
          });
        });

        request.write("Hello World!");
        request.on("error", (error) => {
          console.error(error);
        });

        request.end();
      }
    });
  };
}
