import express from "express";
import { users } from "./database";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(1060, () => {
  console.log("🚀 Start on port 1060.");
});

// get list
app.get("/users", (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users));
});
