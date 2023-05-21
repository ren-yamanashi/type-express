import typeExpress from 'typeExpress';
import { users } from './database';

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

typeExpress.post('/data/create', (req, res) => {
  const data = req.body;
  if (data) {
    users.push({
      id: data.id as number,
      name: data.name as string,
    });
  }
  console.log(users);
  res.send('Received Post Data');
});

typeExpress.use([
  (req, res, next, error) => {
    console.log('test1');
    next();
  },
  (req, res, next, error) => {
    console.log('test2');
    next();
  },
]);
typeExpress.use((req, res, next, error) => {
  console.log('test3');
  next();
});
typeExpress.use('/users/:id', (req, res, next, error) => {
  console.log('test4');
  console.log(req.params.id);
});

typeExpress.listen(PORT, () => {
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
