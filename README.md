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
├── express_sample  # expressのサンプルディレクトリ(比較用)
│   └── src
│
└── src
    ├── __tests__
    │   ├── e2e
    │   ├── integration
    │   └── unit
    ├── router
    └── types
```
