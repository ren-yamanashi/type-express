import { TypeExpress } from "./application";

const PORT = 8000;
const app = new TypeExpress();

app.listen(PORT);
app.get();