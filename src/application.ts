import { HttpServer, HttpServerFactory } from "./infrastructure/http.interface";
import { Router } from "./router/route";
import { Handlers } from "./types";

export class TypeExpress {
  private server: HttpServer;
  private router: Router;

  constructor(serverFactory: HttpServerFactory) {
    this.router = new Router();
    this.server = serverFactory.createServer((req, res) => {
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
    });
  }
}
