"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const PORT = 8000;
const app = new application_1.TypeExpress();
app.listen(PORT);
app.get();
