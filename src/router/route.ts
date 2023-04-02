import { Handlers } from "../types";
import { TypeExpressRequest } from "../request";
import { TypeExpressResponse } from "../response";
import { getParams, matchPathWithUrl } from "../modules/path";
import { HttpRequest, HttpServerResponseIncludeRequest } from "../infrastructure/http.interface";

export class Router {
  private routeRegistry: { path: string; handlers: Handlers<any> }[] = [];

  public registerRoute<T extends string>(arg: {
    path: string;
    handlers: Handlers<T>;
  }): void {
    this.routeRegistry.push(arg);
  }

  public createRoute(req: HttpRequest, res: HttpServerResponseIncludeRequest): void {
    const url = req.url ?? "";
    const method = req.method;

    for (const item of this.routeRegistry) {
      if (matchPathWithUrl(item.path, url) && method === "GET") {
        const request = new TypeExpressRequest<typeof item.path>(req);
        const response = new TypeExpressResponse(res);
        request.params = getParams(item.path, url);

        item.handlers(request, response);
      }
    }
  }
}
