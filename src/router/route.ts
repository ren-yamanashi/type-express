import { Handlers } from "../types/common";
import { TypeExpressRequest } from "../request";
import { TypeExpressResponse } from "../response";
import {
  HttpRequest,
  HttpServerResponseIncludeRequest,
} from "../interfaces/http";
import { HttpRequestMethod } from "src/types/http";
import { ExtractRouteParams } from "src/types/route";

export class Router {
  private routeRegistry = new Map<
    string,
    { handlers: Handlers<any>; method: HttpRequestMethod }
  >();

  /**
   * @param path ex:`/user/:userId`
   * @param url ex: `/user/1/`
   * ex: "/user/:id/books/:bookId", "/user/123/books/sample-book-id" -> true
   *      "/user/:id", "/user/books/sample-book-id" -> false
   */
  private matchPathWithUrl(path: string, url: string): boolean {
    if (path.slice(-1) !== "/") path = `${path}/`;
    if (url.slice(-1) !== "/") url = `${url}/`;

    const urlParts = url.split("/");
    const paths = path.split("/");

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
  private getParams<T extends string>(
    path: T,
    url: string
  ): ExtractRouteParams<T> {
    const urlParts = url.split("/").reverse();
    const paths = path.split("/").reverse();
    let params: Partial<ExtractRouteParams<T>> = {};
    for (let i = 0; i <= paths.length; i++) {
      const path = paths[i];
      const urlPart = urlParts[i];
      if (/:/.test(paths[i])) {
        params[path.slice(1) as keyof ExtractRouteParams<T>] = String(
          urlPart
        ) as ExtractRouteParams<T>[keyof ExtractRouteParams<T>];
      }
    }
    return params as ExtractRouteParams<T>;
  }

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

  /**
   * Iterates through the registered routes, and when a matching route is found,
   * calls the associated handlers with the request and response objects.
   * 登録されたルートを反復処理し、一致するルートが見つかった場合、
   * 関連するハンドラーをリクエストオブジェクトとレスポンスオブジェクトを使って呼び出す。
   *
   * @param req - An HttpRequest object representing the incoming request.
   *              入力リクエストを表すHttpRequestオブジェクト。
   * @param res - An HttpServerResponseIncludeRequest object representing the server response.
   *              サーバーのレスポンスを表すHttpServerResponseIncludeRequestオブジェクト。
   */
  public createRoute(
    req: HttpRequest,
    res: HttpServerResponseIncludeRequest
  ): void {
    const url = req.url ?? "";
    const method = req.method;

    for (const key of this.routeRegistry.keys()) {
      const route = this.routeRegistry.get(key);
      if (this.matchPathWithUrl(key, url) && method === route?.method) {
        const request = new TypeExpressRequest<typeof key>(req);
        const response = new TypeExpressResponse(res);

        request.params = this.getParams(key, url);
        route.handlers(request, response);
      }
    }
  }
}
