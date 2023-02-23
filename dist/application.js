"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeExpress = void 0;
const http_1 = __importDefault(require("http"));
class TypeExpress {
    constructor() {
        this.listen = (port) => {
            const server = http_1.default.createServer((_, res) => {
                // NOTE: Content-typeというヘッダー情報に値を設定
                res.writeHead(200, { "Content-Type": "text/plain" });
                // NOTE: ボディ部分のコンテンツを書き出し
                res.write(this.response);
                res.end();
            });
            server.listen(port, () => {
                console.log(`Application is running on: http://localhost:${port}`);
            });
        };
        this.get = () => {
            this.response = "Hello World";
        };
    }
}
exports.TypeExpress = TypeExpress;
