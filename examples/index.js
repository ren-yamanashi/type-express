"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../src"));
const httpServerFactory_1 = require("../src/plugins/node/httpServerFactory");
const PORT = 8000;
const serverFactory = new httpServerFactory_1.NodeHttpServerFactory();
const app = new src_1.default(serverFactory);
app.get("/", (req, res) => {
    res.send("hello World!");
});
app.get("/users", (req, res) => {
    res.send("Get Users!");
});
app.get("/users/:id", (req, res) => {
    res.send(req.params.id);
});
app.get("/users/:id/textbook/:textbookId", (req, res) => {
    res.send(JSON.stringify(req.params.id));
});
app.listen(PORT, () => {
    console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
