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
            this.port = port;
            const server = http_1.default.createServer((_, res) => {
                // NOTE: Content-typeというヘッダー情報に値を設定
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.write("Hello World!");
                res.end();
            });
            server.listen(port, () => {
                console.log(`Application is running on: http://localhost:${port}`);
            });
        };
        this.get = (requestOptions) => {
            const request = http_1.default.request(Object.assign({ host: "localhost", port: this.port }, requestOptions), (res) => {
                console.log(`Response status code: ${res.statusCode}`);
                console.log("Response headers: ", res.headers);
                res.setEncoding("utf8");
                res.on("data", (chunk) => {
                    console.log(`Response body: ${chunk}`);
                });
            });
            request.on("error", (error) => {
                console.error(`Request failed: ${error.message}`);
            });
            request.end();
        };
    }
}
exports.TypeExpress = TypeExpress;
