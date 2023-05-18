import typeExpress from 'typeExpress';

const PORT = 8000;

typeExpress.get('/', (req, res) => {
  res.send('Hello World!');
});
typeExpress.get('/users', (req, res) => {
  res.send('Get Users!');
});
typeExpress.get('/users/:id', (req, res) => {
  res.send(req.params.id);
});
typeExpress.get('/users/:id/textbook/:textbookId', (req, res) => {
  res.send(JSON.stringify(req.params.id));
});
typeExpress.get('/users/:id/contents', (req, res) => {
  res.sendFile('/examples/typeExpress/index.html');
});
typeExpress.listen(PORT, () => {
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
