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
            this.server.listen(port, () => {
                console.log(`Application is running on: http://localhost:${port}`);
            });
        };
        this.get = (options) => {
            this.server.on("request", (req, res) => {
                if ((req.url === "/", req.method === "POST")) {
                    const request = http_1.default.request(options, (response) => {
                        let body = "";
                        response.on("data", (chunk) => {
                            body += chunk;
                        });
                        response.on("end", () => {
                            console.log(body);
                        });
                    });
                    request.write("Hello World!");
                    request.on("error", (error) => {
                        console.error(error);
                    });
                    request.end();
                }
            });
        };
        this.server = http_1.default.createServer((req, res) => {
            // NOTE: ブラウザで`http://localhost:8000`を開いたときは、自動的にこのリクエストが送られる
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write("Hello World!");
            res.end();
        });
    }
}
exports.TypeExpress = TypeExpress;
