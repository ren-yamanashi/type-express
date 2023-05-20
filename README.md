
## Quick Start

```console
$ git clone https://github.com/type-express/type-express.git
$ cd type-express
$ npm install
```


## Examples and explanations
### Get Method

```ts
typeExpress.get('/users/:id', (req, res) => {
  res.send(req.params.id);
});
```

1. **Server Side**
   typeExpress を使用して、特定の URL パス(例: `/users/2`)で GET リクエストを待ち受けるようにサーバーを設定する。
   この設定には、リクエストが来た際にどのようにデータを処理するか(例: ユーザー情報を取得するなど)のハンドラ関数も含まれる。

2. **Client Side**
   特定の URL パス(例: `users/2`)に GET リクエストを送信。 リクエストには params や query を含むこともある。

3. **Server Side**:
   クライアントからの GET リクエストを受け取り、typeExpress のハンドラ関数が実行される。
   このハンドラ関数ではリクエストボディからデータを取得し、指定された処理(例: ユーザー情報を取得するなど)を行う。
   そしてその結果をレスポンスとして返す。
   (Web ブラウザで特定の URL パスにアクセスした際には自動的に GET メソッドが走る)

### Post Method

```ts
typeExpress.post('/auth/', (req, res) => {
  res.send(req.body);
});
```

1. **Server Side**:
   typeExpress を使用して、特定の URL パス(例: `/data/create`)で POST リクエストを待ち受けるようにサーバーを設定する。
   この設定には、リクエストが来た際にどのようにデータを処理するか(例: データベースへの保存など)のハンドラ関数も含まれる。

2. **Client Side**:
   特定の URL パス(例: `/data/create`)にデータを含む POST リクエストを送信

3. **Server Side**:
   クライアントからの POST リクエストを受け取り、typeExpress のハンドラ関数が実行される
   このハンドラ関数ではリクエストボディからデータを取得し、指定された処理(例: データベースへの保存など)を行う
