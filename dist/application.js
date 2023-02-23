"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_1 = __importDefault(require("http"));
const listen = (port) => {
    const server = http_1.default.createServer((_, res) => {
        // NOTE: Content-typeというヘッダー情報に「application.json」という値を設定
        res.writeHead(200, { "Content-Type": "application.json" });
        // NOTE: ボディ部分のコンテンツを書き出し
        res.write(JSON.stringify({
            data: "Hello World!",
        }));
        res.end();
    });
    server.listen(port, () => {
        console.log(`Application is running on: http://localhost:${port}`);
    });
};
exports.app = {
    listen,
};
