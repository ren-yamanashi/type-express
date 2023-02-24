"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeExpress = void 0;
const http_1 = __importDefault(require("http"));
/**
 * MEMO: get：serverの呼び出しはいらない。設定を書くだけ
 *      getで書いた設定を、createServerに反映する。
 *      その反映する際の分岐処理は、routerで制御する
 */
class TypeExpress {
    constructor() {
        this.server = http_1.default.createServer((req, res) => {
            if (req.method === "GET" && req.url === "/") {
                // NOTE: ブラウザで`http://localhost:8000`を開いたときは、自動的にこのリクエストが送られる
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.write("Hello World!");
                res.end();
            }
        });
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`Application is running on: http://localhost:${port}`);
        });
    }
    get() {
        this.server.on("request", (req, res) => {
            if ((req.url === "/user", req.method === "GET")) {
                req.on("end", () => {
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.write("Get User");
                    res.end();
                });
            }
        });
    }
}
exports.TypeExpress = TypeExpress;
