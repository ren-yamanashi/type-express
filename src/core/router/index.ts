import { RequestFactory } from '../request';
import { ResponseFactory } from '../response';
import { HttpRequest, HttpServerResponseIncludeRequest } from '../../interfaces/http';
import { HttpRequestMethod } from 'src/core/request/types';
import { Middleware } from '../middleware';
import { removeTrailingSlash } from 'src/helper/format';
import { checkMatchRoutePathWithUrl } from 'src/helper/checkMatch';
import { RouterHandler } from './types';

export class Router {
  private readonly routeRegistry = new Map<
    string,
    { handler: RouterHandler<any>; method: HttpRequestMethod }
  >();
  constructor(
    private readonly requestFactory: RequestFactory,
    private readonly responseFactory: ResponseFactory,
  ) {}

  private getRegistry<T extends string>(
    key: string,
  ): { handler: RouterHandler<T>; method: HttpRequestMethod } | undefined {
    return this.routeRegistry.get(key);
  }

  public setRegistry<T extends string>(arg: {
    path: string;
    handler: RouterHandler<T>;
    method: HttpRequestMethod;
  }): void {
    this.routeRegistry.set(arg.path, {
      handler: arg.handler,
      method: arg.method,
    });
  }

  /**
   * Iterates through the registered routes, and when a matching route is found,
   * calls the associated handlers with the request and response objects.
   *
   * @param req - An HttpRequest object representing the incoming request.
   * @param res - An HttpServerResponseIncludeRequest object representing the server response.
   */
  public createRoute(
    req: HttpRequest,
    res: HttpServerResponseIncludeRequest,
    middleware: Middleware,
  ): void {
    for (const key of this.routeRegistry.keys()) {
      const url = removeTrailingSlash(req.url ?? '');
      const route = this.getRegistry(key);
      const request = this.requestFactory.create<typeof key>(req);
      const response = this.responseFactory.create({ httpResponse: res });

      // NOTE: setRequest
      if (!checkMatchRoutePathWithUrl(key, url) || req.method !== route?.method) continue;
      request.setParams(key, url);
      request.setBody();

      try {
        middleware.executeHandlers(key, request, response);
        route.handler(request, response);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
