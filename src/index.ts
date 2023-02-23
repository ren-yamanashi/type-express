import { TypeExpress } from "./application";

const PORT = 8000;
const HOST = "localhost";
const app = new TypeExpress();


app.listen(PORT);
app.get();