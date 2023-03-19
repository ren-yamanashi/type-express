import { TypeExpress } from "./application";
const PORT = 8000;
const app = new TypeExpress();

app.listen(PORT, () => {
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
app.get();
