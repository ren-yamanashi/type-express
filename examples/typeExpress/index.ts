import typeExpress from 'typeExpress';
import { createUser, deleteUser, updateUser } from './database';

const PORT = 8000;

/**
 *
 * get method
 *
 */
typeExpress.get('/', (req, res) => {
  res.setHeader({ 'Access-Control-Allow-Origin': '*' });
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

/**
 *
 * post method
 *
 */
// NOTE: curl -X POST -H "Content-Type: application/json" -d '{"id":"3", "name":"hoge"}' http://localhost:8000/data/create
typeExpress.post('/data/create', (req, res) => {
  if (req.body) {
    const user = {
      id: Number(req.body.id),
      name: req.body.name as string,
    };
    const newUsers = createUser(user);
    console.log(newUsers);
  }
  res.send('Executed');
});

/**
 *
 * put method
 *
 */
// NOTE: curl -X PUT -H "Content-Type: application/json" -d '{"name":"hoge"}' http://localhost:8000/data/2/update
typeExpress.put('/data/:id/update', (req, res) => {
  if (req.body?.name) {
    const user = { id: Number(req.params.id), name: req.body.name as string };
    const newUsers = updateUser(user);
    console.log(newUsers);
  }
  res.send('Executed');
});

/**
 *
 * delete method
 *
 */
// NOTE: curl -X DELETE http://localhost:8000/data/2/delete
typeExpress.delete('/data/:id/delete', (req, res) => {
  const newUsers = deleteUser(Number(req.params.id));
  console.log(newUsers);
  res.send('Executed');
});

/**
 *
 * use method
 *
 */
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
  console.log(req.params?.id);
});

/**
 *
 * listen method
 *
 */
typeExpress.listen(PORT, () => {
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
});
