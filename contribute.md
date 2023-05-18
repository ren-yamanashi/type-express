## References

- Express git hub: https://github.com/expressjs/express
- Node.Js documents: https://nodejs.org/docs

## package manager

yarn

## 📚 Development procedure

1. Install package

```bash
yarn install
```

2. Stat up (Either of the following)

```bash
yarn start       # normal
yarn start:watch # tsc-watch
```

3. Start up express

```bash
cd express_sample && yarn start:dev
```

## 🚀 Commands

```bash
# npx ts-node src/index.ts
yarn start

# tsc-watch --onSuccess \"node dist/index.js\"
yarn start:watch

# yarn run vitest ./**tests**
yarn test

# export TEST_TYPE=unit && vitest run **tests**/unit/
yarn test:unit
```

## Directory structure

```
.
├── examples
│   ├── typeExpress         // typeExpressの実行サンプルディレクトリ(開発者用)
│   └── express_sample      // expressの実行サンプルディレクトリ (開発者用)
│
└── src
    ├── __mocks__
    ├── __tests__
    ├── app                 // ビジネスロジックを格納するディレクトリ
    │   ├── middleware      // 認証・エラーハンドリングを行うディレクトリ
    │   ├── router          // リクエストに応じたルーティングを行うディレクトリ
    |   │   └── route.ts
    │   ├── request.ts      // httpリクエストの定義(req.paramsなど)
    │   └── response.ts     // レスポンスの処理(res.send, res.sendFileなど)
    │
    ├── helper              // 再利用可能な補助的なコードやヘルパーファンクションを含むディテクトり
    ├── infrastructure      // 必要なモジュールの提供 これはinterfaceに依存
    ├── interface           // infrastructureのinterface
    ├── types               // アプリケーション全体で共有されるtypeファイルを置く
    ├── di.ts               // DIコンテナへの登録を行う
    └── index.ts
```
