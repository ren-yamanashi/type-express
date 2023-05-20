import typeExpress from 'typeExpress';

const PORT = 8000;

/**
 *
 * Get Method
 *
 */
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

/***
 *
 * Post Method
 *
 */
typeExpress.post('/data/create', (req, res) => {
  console.log(req.body)
  res.send('Received POST Data');
});

typeExpress.listen(PORT, () => {
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
