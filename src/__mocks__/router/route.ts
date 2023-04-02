import {
  HttpRequest,
  HttpServerResponseIncludeRequest,
} from "src/infrastructure/http.interface";
import { Router } from "src/router/route";
import { Handlers, HttpRequestMethod } from "src/types";

export class MockRouter extends Router {
  public registerRoute<T extends string>(arg: {
    path: string;
    handlers: Handlers<T>;
    method: HttpRequestMethod;
  }): void {
    super.registerRoute(arg);
  }

  public createRoute(
    req: HttpRequest,
    res: HttpServerResponseIncludeRequest
  ): void {
    super.createRoute(req, res);
  }
  
  getRouteRegistry() {
    return this.routeRegistry;
  }
}

export const mockRouter = new MockRouter();