import { container } from "./container";
import { HttpServer, HttpServerFactory } from "./interfaces/http";
import { Router } from "./router/route";
import { Handlers } from "./types/common";

export class TypeExpress {
  private server: HttpServer;
  private router: Router;

  constructor() {
    // FIXME: ここでコンテナを呼び出したくない。引数として受け取る？？
    const http = container.resolve<HttpServerFactory>("http");
    this.router = container.resolve<Router>("router");
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
      method: "GET",
    });
  }
}
