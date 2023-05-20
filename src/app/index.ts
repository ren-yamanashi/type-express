import { HTTP_REQUEST_METHOD } from '../helper/constance';
import { HttpServerFactoryKey, RouterKey, container } from '../di';
import { HttpServer, HttpServerFactoryInterface } from '../interfaces/http';
import { Handlers, Router } from './router/route';

export class TypeExpress {
  private readonly httpServerFactory: HttpServerFactoryInterface;
  private readonly httpServer: HttpServer;
  private readonly router: Router;

  constructor() {
    this.router = container.resolve(RouterKey);
    this.httpServerFactory = container.resolve(HttpServerFactoryKey);
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
}
