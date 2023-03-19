import { createServer } from "http";
import { HttpServer } from "./types/http";
import { Router } from "./router/route";
export interface Application {
  listen: (port: number, onSuccess: () => void) => void;
  get: (path: string, writeMessage: string) => void;
}

/**
 * MEMO: get：serverの呼び出しはいらない。設定を書くだけ
 *      getで書いた設定を、createServerに反映する。
 *      その反映する際の分岐処理は、routerで制御する
 */
const router = new Router();
export class TypeExpress implements Application {
  server: HttpServer;

  constructor() {
    this.server = createServer((req, res) => {
      router.createRoute(req, res);
    });
  }

  listen(port: number, onSuccess: () => void): void {
    this.server.listen(port, onSuccess);
  }

  get(path: string, writeMessage: string): void {
    router.addToStack({ path, writeMessage });
  }
}
