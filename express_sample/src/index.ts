import express from "express";
import { users } from "./database";

const app: express.Express = express();

app.listen(1060, () => {
  console.log("🚀 Application is running on: http://localhost:1060.");
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello world.");
});
// get list
app.get("/users", (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users));
});
