"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const PORT = 8000;
const HOST = "localhost";
const app = new application_1.TypeExpress();
app.listen(PORT);
app.get({
    port: PORT,
    host: HOST,
    path: "/",
    method: "GET",
});
