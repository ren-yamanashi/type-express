import { RequestFactory } from '../request';
import { ResponseFactory } from '../response';
import {
  HTTP_STATE,
  HttpRequest,
  HttpServerInterface,
  HttpServerResponseIncludeRequest,
  HttpState,
} from '../../interfaces/http';
import { HttpRequestMethod } from 'src/types/http';
import { Request } from '../request';
import { Response } from '../response';
import { formatUrlParams, getParams } from './params';

export type Handlers<T extends string> = (req: Request<T>, res: Response) => void;
export type MiddlewareHandler = (
  req: Request<any>,
  res: Response,
  next: () => void,
  err?: unknown,
) => unknown;
export class Router {
  private routeRegistry = new Map<string, { handlers: Handlers<any>; method: HttpRequestMethod }>();
  private middlewareRegistry = new Map<string, MiddlewareHandler[]>();
  private requestFactory: RequestFactory;
  private responseFactory: ResponseFactory;

  constructor(_requestFactory: RequestFactory, _responseFactory: ResponseFactory) {
    this.requestFactory = _requestFactory;
    this.responseFactory = _responseFactory;
  }

  /**
   * @param path ex:`/user/:userId`
   * @param url ex: `/user/1/`
   * ex:  "/user/:id/books/:bookId", "/user/123/books/sample-book-id" -> true
   *      "/user/:id", "/user/books/sample-book-id" -> false
   */
  private matchPathWithUrl(path: string, url: string): boolean {
    if (path.slice(-1) !== '/') path = `${path}/`;
    if (url.slice(-1) !== '/') url = `${url}/`;
    const urlParts = url.split('/');
    const paths = path.split('/');
    if (urlParts.length !== paths.length) return false;
    return paths.every((p, i) => (!/:/.test(p) ? p === urlParts[i] : true));
  }

  public setRouteRegistry<T extends string>(arg: {
    path: string;
    handlers: Handlers<T>;
    method: HttpRequestMethod;
  }): void {
    this.routeRegistry.set(arg.path, {
      handlers: arg.handlers,
      method: arg.method,
    });
  }
  public getRouteRegistry(
    key: string,
  ): { handlers: Handlers<any>; method: HttpRequestMethod } | undefined {
    return this.routeRegistry.get(key);
  }

  public setMiddlewareRegistry(key: string, handlers: MiddlewareHandler[]): void {
    this.middlewareRegistry.set(key, handlers);
  }
  public getMiddlewareRegistry(key: string): Array<MiddlewareHandler> | undefined {
    return this.middlewareRegistry.get(key);
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
    httpServer: HttpServerInterface,
  ): void {
    for (const key of this.routeRegistry.keys()) {
      const url = formatUrlParams(req.url ?? '');
      const route = this.getRouteRegistry(key);
      if (!this.matchPathWithUrl(key, url) || req.method !== route?.method) continue;
      const request = this.requestFactory.create<typeof key>(req);
      const response = this.responseFactory.create(res, httpServer);
      request.setParams(getParams(key, url));

      // NOTE: execute middleware handlers
      for (const path of this.middlewareRegistry.keys()) {
        if (path === key || path === '*') {
          const handlers = this.getMiddlewareRegistry(path);
          if (!handlers) break;
          let currentHandlerIdx = 0;
          const next = () => {
            if (currentHandlerIdx + 1 === handlers.length) {
              return;
            }
            currentHandlerIdx++;
          };
          handlers[currentHandlerIdx](request, response, next);
        }
      }

      switch (req.method) {
        case 'POST': {
          request.setBody(req.body);
        }
      }
      route.handlers(request, response);
    }
  }
}
