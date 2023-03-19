import { HttpServerRequest, HttpServerResponse } from "../types/http";

export class Router {
  stack: { path: string; writeMessage: string }[];
  writeHead: string;
  writeMessage: string;
  constructor() {
    this.stack = [];
    this.writeHead = this.writeMessage = "Hello World!";
  }
  addToStack(arg: { path: string; writeMessage: string }): void {
    this.stack.push(arg);
  }
  createRoute(req: HttpServerRequest, res: HttpServerResponse): void {
    const url = req.url;
    const method = req.method;
    this.stack.forEach((item) => {
      if (url === item.path && method === "GET") {
        res.setHeader("Content-Type", "text/plain");
        res.write(item.writeMessage);
        return res.end();
      }
    });
  }
}
