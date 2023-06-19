import { RequestFactory } from '../request';
import { ResponseFactory } from '../response';
import { HttpRequest, HttpServerResponseIncludeRequest } from '../../interfaces/http';
import { HttpRequestMethod } from 'src/types/http';
import { Request } from '../request';
import { Response } from '../response';
import { formatUrlPath, getParams } from './params';

export type Handlers<T extends string> = (req: Request<T>, res: Response) => void;
export type MiddlewareHandler<T extends string> = (
  req: Request<T>,
  res: Response,
  next: () => void,
  err?: unknown,
) => unknown;

export class Router {
  private routeRegistry = new Map<string, { handlers: Handlers<any>; method: HttpRequestMethod }>();
  private middlewareRegistry = new Map<string, MiddlewareHandler<any>[]>();
  private currentHandlerIdx = 0;
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

  private incrementCurrentHandlerIdx = (): void => {
    this.currentHandlerIdx++;
  };

  private initCurrentHandlerIdx = (): void => {
    this.currentHandlerIdx = 0;
  };

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

  public setMiddlewareRegistry<T extends string>(
    key: string,
    handlers: MiddlewareHandler<T>[],
  ): void {
    if (this.middlewareRegistry.has(key)) {
      this.middlewareRegistry.get(key)?.push(...handlers);
      return;
    }
    this.middlewareRegistry.set(key, handlers);
  }

  public getMiddlewareRegistry(key: string): Array<MiddlewareHandler<any>> | undefined {
    return this.middlewareRegistry.get(key);
  }

  /**
   * Iterates through the registered routes, and when a matching route is found,
   * calls the associated handlers with the request and response objects.
   *
   * @param req - An HttpRequest object representing the incoming request.
   * @param res - An HttpServerResponseIncludeRequest object representing the server response.
   */
  public createRoute(req: HttpRequest, res: HttpServerResponseIncludeRequest): void {
    for (const key of this.routeRegistry.keys()) {
      const url = formatUrlPath(req.url ?? '');
      const route = this.getRouteRegistry(key);
      const request = this.requestFactory.create<typeof key>(req);
      const response = this.responseFactory.create(res);

      if (!this.matchPathWithUrl(key, url) || req.method !== route?.method) continue;
      request.setParams(getParams(key, url));

      // NOTE: execute middleware handlers
      for (const path of this.middlewareRegistry.keys()) {
        const handlers = this.getMiddlewareRegistry(path);
        if ((path !== key && path !== '*') || !handlers?.length) break;

        // TODO: error handler
        this.initCurrentHandlerIdx();
        const next = () => {
          this.incrementCurrentHandlerIdx();
          if (handlers[this.currentHandlerIdx]) {
            try {
              handlers[this.currentHandlerIdx](request, response, next);
            } catch (error) {
              console.error(error);
            }
          }
        };

        try {
          handlers[this.currentHandlerIdx](request, response, next);
        } catch (error) {
          console.error(error);
        }

        // NOTE: next() was not called in the last middleware, so stop processing
        if (this.currentHandlerIdx < handlers.length) break;
      }

      switch (req.method) {
        case 'POST': {
          request.setBody(req.body);
          break;
        }
        case 'PUT': {
          request.setBody(req.body);
          break;
        }
      }

      try {
        route.handlers(request, response);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
