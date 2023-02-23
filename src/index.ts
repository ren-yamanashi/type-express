import { TypeExpress } from "./application";

const app = new TypeExpress();

app.listen(8000);
app.get("Hello World!");
