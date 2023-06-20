import { RequestFactory } from './request';
import { ResponseFactory } from './response';
import { HttpRequest, HttpServerResponseIncludeRequest } from '../interfaces/http';
import { HttpRequestMethod } from 'src/types/http';
import { Request } from './request';
import { Response } from './response';
import { Middleware } from './middleware';

export type Handlers<T extends string> = (req: Request<T>, res: Response) => void;

export class Router {
  private routeRegistry = new Map<string, { handlers: Handlers<any>; method: HttpRequestMethod }>();
  private requestFactory: RequestFactory;
  private responseFactory: ResponseFactory;
  constructor(_requestFactory: RequestFactory, _responseFactory: ResponseFactory) {
    this.requestFactory = _requestFactory;
    this.responseFactory = _responseFactory;
  }

  /**
   * should remove the trailing slash if it exists
   * @param urlPath ex: `/users/1234/`
   * @returns ex: `/users/1234`
   */
  private formatPath = (urlParams: string): string => {
    const regex = /\/$/;
    if (regex.test(urlParams)) return urlParams.slice(0, -1);
    return urlParams;
  };

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

  private getRegistry<T extends string>(
    key: string,
  ): { handlers: Handlers<T>; method: HttpRequestMethod } | undefined {
    return this.routeRegistry.get(key);
  }

  public setRegistry<T extends string>(arg: {
    path: string;
    handlers: Handlers<T>;
    method: HttpRequestMethod;
  }): void {
    this.routeRegistry.set(arg.path, {
      handlers: arg.handlers,
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
    // NOTE:
    for (const key of this.routeRegistry.keys()) {
      const url = this.formatPath(req.url ?? '');
      const route = this.getRegistry(key);
      const request = this.requestFactory.create<typeof key>(req);
      const response = this.responseFactory.create(res);

      // NOTE: setRequest
      if (!this.matchPathWithUrl(key, url) || req.method !== route?.method) continue;
      request.setParams(key, url);
      request.setBody();

      try {
        middleware.executeHandlers(key, request, response);
        route.handlers(request, response);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
