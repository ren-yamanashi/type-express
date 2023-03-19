import { Handlers } from "../types";
import { TypeExpressRequest } from "../request";
import { TypeExpressResponse } from "../response";
import { HttpServerRequest, HttpServerResponse } from "../types/http";

export class Router {
  stack: { path: string; handlers: Handlers }[];
  constructor() {
    this.stack = [];
  }
  addToStack(arg: { path: string; handlers: Handlers }): void {
    this.stack.push(arg);
  }
  createRoute(req: HttpServerRequest, res: HttpServerResponse): void {
    const url = req.url;
    const method = req.method;
    this.stack.forEach((item) => {
      if (url === item.path && method === "GET") {
        const request = new TypeExpressRequest(req);
        const response = new TypeExpressResponse(res);
        item.handlers(request, response);
      }
    });
  }
}
