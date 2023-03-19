import TypeExpress from "..";

const PORT = 8000;
const app = new TypeExpress();

app.listen(PORT, () => {
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
app.get("/", (req:any, res:any) => {
  res.send("hello World!");
});
app.get("/user", (req:any, res:any) => {
  res.send("Get User!!");
});
