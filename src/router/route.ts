import { Handlers, HttpRequestMethod } from "../types";
import { TypeExpressRequest } from "../request";
import { TypeExpressResponse } from "../response";
import { getParams, matchPathWithUrl } from "../modules/route/path";
import {
  HttpRequest,
  HttpServerResponseIncludeRequest,
} from "../infrastructure/http.interface";

export class Router {
  protected routeRegistry = new Map<
    string,
    { handlers: Handlers<any>; method: HttpRequestMethod }
  >();

  public registerRoute<T extends string>(arg: {
    path: string;
    handlers: Handlers<T>;
    method: HttpRequestMethod;
  }): void {
    this.routeRegistry.set(arg.path, {
      handlers: arg.handlers,
      method: arg.method,
    });
  }

  public createRoute(
    req: HttpRequest,
    res: HttpServerResponseIncludeRequest
  ): void {
    const url = req.url ?? "";
    const method = req.method;

    for (const key of this.routeRegistry.keys()) {
      const route = this.routeRegistry.get(key);
      if (matchPathWithUrl(key, url) && method === route?.method) {
        const request = new TypeExpressRequest<typeof key>(req);
        const response = new TypeExpressResponse(res);

        request.params = getParams(key, url);
        route.handlers(request, response);
      }
    }
  }
}
