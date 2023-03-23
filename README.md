## References

- Express git hub: https://github.com/expressjs/express
- Node.Js documents: https://nodejs.org/docs

## パッケージマネージャー

yarn

## 📚 開発手順

1. パッケージのインストール

```bash
yarn install
```

2. 起動（下記のどちらでも可能）

```bash
yarn start:dev       # 通常起動
yarn start:watch-dev # tsc-watch で起動
```

3. express の動作と比較したい時

```bash
cd express_sample # ルートディレクトリからの相対パス

yarn start:dev
```

## 🚀 Commands

```bash
# npx ts-node src/index.ts
yarn start:dev

# tsc-watch --onSuccess \"node dist/index.js\"
yarn start:watch-dev

# yarn run vitest ./**tests**
yarn test

# export TEST_TYPE=unit && vitest run **tests**/unit/
yarn test:unit
```

## ディレクトリ構成

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
