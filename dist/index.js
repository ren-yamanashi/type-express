"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
// NodeJs Server
const server = http_1.default.createServer();
const doRequest = (_, res) => {
    // NOTE: Content-typeというヘッダー情報に「application.json」という値を設定
    res.writeHead(200, { "Content-Type": "application.json" });
    // NOTE: ボディ部分のコンテンツを書き出し
    res.write(JSON.stringify({
        data: "Hello World!",
    }));
    res.end();
};
server.on("request", doRequest);
server.listen(8000, () => {
    console.log("Application is running on: http://localhost:8000.");
});
