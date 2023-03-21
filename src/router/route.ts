import { Handlers } from "../types";
import { TypeExpressRequest } from "../request";
import { TypeExpressResponse } from "../response";
import { HttpServerRequest, HttpServerResponse } from "../types/http";
import { matchPathWithUrl } from "../modules/path";

export class Router {
  stack: { path: string; handlers: Handlers<any> }[];
  constructor() {
    this.stack = [];
  }
  addToStack<T extends string>(arg: { path: string; handlers: Handlers<T> }): void {
    this.stack.push(arg);
  }
  createRoute(req: HttpServerRequest, res: HttpServerResponse): void {
    const url = req.url ?? "";
    const method = req.method;
    this.stack.forEach((item) => {
      if (matchPathWithUrl(item.path, url) && method === "GET") {
        const request = new TypeExpressRequest<typeof item.path>(req);
        const response = new TypeExpressResponse(res);
        request.getParams(item.path, url);

        console.log(
          "🚀 ~ file: route.ts:24 ~ Router ~ this.stack.forEach ~ request.params:",
          request.params
        );

        item.handlers(request, response);
      }
    });
  }
}
