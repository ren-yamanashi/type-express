import { HTTP_REQUEST_METHOD } from './request/constance';
import { httpServerFactoryKey, routerKey, container, middlewareKey } from '../di';
import { HttpServerFactoryInterface, Server, HttpRequest, HttpResponse } from '../interfaces/http';
import { Router } from './router';
import { flattenArray } from '../helper/format';
import { findFirstStrFromArr } from '../helper/find';
import { Middleware } from './middleware';
import { MiddlewareHandler } from './middleware/types';
import { RouterHandler } from './router/types';

/**
 * Providing a method
 * Arguments are registered with route and middleware
 */
export class TypeExpress {
  private readonly httpServer: Server<HttpRequest, HttpResponse>;
  private readonly router: Router;
  private readonly middleware: Middleware;
  constructor({
    router = container.resolve(routerKey),
    middleware = container.resolve(middlewareKey),
    httpServerFactory = container.resolve(httpServerFactoryKey),
  }: {
    readonly router?: Router;
    readonly middleware?: Middleware;
    readonly httpServerFactory?: HttpServerFactoryInterface;
  }) {
    this.router = router;
    this.middleware = middleware;
    this.httpServer = httpServerFactory.createServer((req, res) => {
      router.createRoute(req, res, middleware);
    });
  }

  public listen(port: number, onSuccess: () => void): void {
    this.httpServer.listen(port, onSuccess);
  }

  public get<T extends string>(path: T, handler: RouterHandler<T>): void {
    this.router.setRegistry({
      path,
      handler,
      method: HTTP_REQUEST_METHOD.GET,
    });
  }

  public post<T extends string>(path: T, handler: RouterHandler<T>): void {
    this.router.setRegistry({
      path,
      handler,
      method: HTTP_REQUEST_METHOD.POST,
    });
  }

  public put<T extends string>(path: T, handler: RouterHandler<T>): void {
    this.router.setRegistry({
      path,
      handler,
      method: HTTP_REQUEST_METHOD.PUT,
    });
  }

  public delete<T extends string>(path: T, handler: RouterHandler<T>): void {
    this.router.setRegistry({
      path,
      handler,
      method: HTTP_REQUEST_METHOD.DELETE,
    });
  }

  public use<T extends string>(
    ...args: (T | MiddlewareHandler<T> | MiddlewareHandler<T>[])[]
  ): void | Error {
    // NOTE: disambiguate typeExpress.use([fn])
    const argArr = flattenArray<MiddlewareHandler<T>, T>(args);
    if (!argArr.length) {
      const error = new TypeError('typeExpress.use() requires a middleware function');
      console.error(error);
      return error;
    }
    const path = findFirstStrFromArr(argArr) ?? '*';
    const handlers = argArr.filter(
      (arg): arg is MiddlewareHandler<T> => arg !== path && typeof arg === 'function',
    );
    this.middleware.setRegistry<T>(path, handlers);
  }
}
