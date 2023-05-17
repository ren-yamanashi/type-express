```ts
import typeExpress from 'typeExpress';

typeExpress.get('/', (req, res) => {
  res.send('Hello World');
});

typeExpress.listen(3000);
```
getメソッドは、第一引数として指定したルート（この場合は `/`）にGETリクエストが来たときに、第二引数として指定したコールバック関数を実行します。
コールバック関数は、リクエスト（`req`）とレスポンス（`res`）の2つの引数を取ります。
このコードでは、コールバック関数内で`res.send("Hello world!");`が呼ばれています。
これにより、サーバーは "Hello world!" というテキストをレスポンスボディに含めたHTTPレスポンスをクライアントに返します。

## Examples

```console
$ git clone https://github.com/type-express/type-express.git
$ cd type-express
$ npm install
```
