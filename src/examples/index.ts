import TypeExpress from "..";

const PORT = 8000;
const app = new TypeExpress();

app.get("/", (req, res) => {
  res.send("hello World!");
});
app.get("/user", (req, res) => {
  res.send("Get User!!");
});
app.listen(PORT, () => {
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
