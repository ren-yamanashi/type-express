import { HTTP_REQUEST_METHOD } from "./common/http/constance";
import { HttpServerFactoryKey, RouterKey, container } from "./di";
import { HttpServer } from "./interfaces/http";
import { Router } from "./router/route";
import { Handlers } from "./types/common";

export class TypeExpress {
  private readonly server: HttpServer;
  private readonly router: Router;

  constructor() {
    const http = container.resolve(HttpServerFactoryKey);
    this.router = container.resolve(RouterKey);
    this.server = http.createServer((req, res) => {
      this.router.createRoute(req, res);
    });
  }

  public listen(port: number, onSuccess: () => void): void {
    this.server.listen(port, onSuccess);
  }

  public get<T extends string>(path: T, handlers: Handlers<T>): void {
    this.router.registerRoute({
      path,
      handlers,
      method: HTTP_REQUEST_METHOD.GET,
    });
  }
}
