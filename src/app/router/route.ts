import { RequestFactory } from '../request';
import { ResponseFactory } from '../response';
import { HttpRequest, HttpServerResponseIncludeRequest } from '../../interfaces/http';
import { HttpRequestMethod } from 'src/types/http';
import { ExtractRouteParams } from 'src/types/route';
import { Request } from '../request';
import { Response } from '../response';

export type Handlers<T extends string> = (req: Request<T>, res: Response) => void;

export class Router {
  private routeRegistry: Map<string, { handlers: Handlers<any>; method: HttpRequestMethod }>;
  private requestFactory: RequestFactory;
  private responseFactory: ResponseFactory;

  constructor(_requestFactory: RequestFactory, _responseFactory: ResponseFactory) {
    this.requestFactory = _requestFactory;
    this.responseFactory = _responseFactory;
    this.routeRegistry = new Map();
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

  private formatUrlParams(urlParams: string): string {
    const regex = /\/$/;
    if (regex.test(urlParams)) return urlParams.slice(0, -1);
    return urlParams;
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

  /**
   *
   * @param path ex:`/user/:userId`
   * @param url ex: `/user/1/`
   * @returns ex: {userId: 1}
   * ex: arg: ("/user/:id", "/user/sample-user-id") -> res: {id: "sample-user-id"}
   *     arg: ("/user/:id/books/:bookId", "/user/123/books/1000") -> res: {id: "123",bookId: "1000"}
   */
  private getParams<T extends string>(path: T, url: string): ExtractRouteParams<T> {
    const urlParts = url.split('/').reverse();
    const paths = path.split('/').reverse();
    let params: Partial<ExtractRouteParams<T>> = {};
    for (let i = 0; i <= paths.length; i++) {
      const path = paths[i];
      const urlPart = urlParts[i];
      if (/:/.test(paths[i])) {
        params[path.slice(1) as keyof ExtractRouteParams<T>] = String(
          urlPart,
        ) as ExtractRouteParams<T>[keyof ExtractRouteParams<T>];
      }
    }
    return params as ExtractRouteParams<T>;
  }

  /**
   * Iterates through the registered routes, and when a matching route is found,
   * calls the associated handlers with the request and response objects.
   *
   * @param req - An HttpRequest object representing the incoming request.
   * @param res - An HttpServerResponseIncludeRequest object representing the server response.
   */
  public createRoute(req: HttpRequest, res: HttpServerResponseIncludeRequest): void {
    const url = this.formatUrlParams(req.url ?? '');
    for (const key of this.routeRegistry.keys()) {
      const route = this.getRouteRegistry(key);
      if (this.matchPathWithUrl(key, url) && req.method === route?.method) {
        const request = this.requestFactory.create<typeof key>(req);
        const response = this.responseFactory.create(res);
        request.setParams(this.getParams(key, url));
        route.handlers(request, response);
      }
    }
  }
}
