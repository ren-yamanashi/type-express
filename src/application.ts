import { createServer } from "http";
import { HttpServer } from "./types/http";
import { Router } from "./router/route";
import { Handlers } from "./types";
export interface Application {
  listen: (port: number, onSuccess: () => void) => void;
  get: (path: string, handlers: Handlers) => void;
}

export class TypeExpress implements Application {
  server: HttpServer;
  router: Router;

  constructor() {
    this.router = new Router();
    this.server = createServer((req, res) => {
      this.router.createRoute(req, res);
    });
  }

  listen(port: number, onSuccess: () => void): void {
    this.server.listen(port, onSuccess);
  }

  get(path: string, handlers: Handlers): void {
    this.router.addToStack({
      path,
      handlers,
    });
  }
}
