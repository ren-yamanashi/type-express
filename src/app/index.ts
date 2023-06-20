import { HTTP_REQUEST_METHOD } from '../helper/constance';
import { HttpServerFactoryKey, RouterKey, container } from '../di';
import { HttpServerFactoryInterface, Server, HttpRequest, HttpResponse } from '../interfaces/http';
import { Handlers, MiddlewareHandler, Router } from './router/route';
import { flattenArray } from '../helper/flattenArray';
import { findPathFromArray } from '../helper/findPathFromArray';

/**
 * Providing a method
 * Arguments are registered with route
 */
export class TypeExpress {
  private readonly httpServer: Server<HttpRequest, HttpResponse>;
  constructor(
    private readonly router: Router = container.resolve(RouterKey),
    private readonly httpServerFactory: HttpServerFactoryInterface = container.resolve(
      HttpServerFactoryKey,
    ),
  ) {
    this.httpServer = this.httpServerFactory.createServer((req, res) => {
      this.router.createRoute(req, res);
    });
  }

  public listen(port: number, onSuccess: () => void): void {
    this.httpServer.listen(port, onSuccess);
  }

  public get<T extends string>(path: T, handlers: Handlers<T>): void {
    this.router.setRouteRegistry({
      path,
      handlers,
      method: HTTP_REQUEST_METHOD.GET,
    });
  }

  public post<T extends string>(path: T, handlers: Handlers<T>): void {
    this.router.setRouteRegistry({
      path,
      handlers,
      method: HTTP_REQUEST_METHOD.POST,
    });
  }

  public put<T extends string>(path: T, handlers: Handlers<T>): void {
    this.router.setRouteRegistry({
      path,
      handlers,
      method: HTTP_REQUEST_METHOD.PUT,
    });
  }

  public delete<T extends string>(path: T, handlers: Handlers<T>): void {
    this.router.setRouteRegistry({
      path,
      handlers,
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
    const path = findPathFromArray(argArr) ?? '*';
    const handlers = argArr.filter(
      (arg): arg is MiddlewareHandler<T> => arg !== path && typeof arg === 'function',
    );
    this.router.setMiddlewareRegistry<T>(path, handlers);
  }
}
