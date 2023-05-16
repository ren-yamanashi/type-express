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
├── express
├── express_sample
│   └── src
│
└── src
    ├── __mocks__
    ├── __tests__
    ├── common              // ビジネスロジックを含む再利用されるコード
    ├── infrastructure      // 必要なモジュールの提供 これはinterfaceに依存しており、DIコンテナに登録される。
    ├── interface
    ├── router
    ├── types
    ├── application.ts
    ├── container.ts
    ├── di.ts               // DIコンテナへの登録を行う
    ├── index.ts
    ├── request.ts
    └── response.ts
```
