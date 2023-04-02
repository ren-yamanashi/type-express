import { TypeExpress } from "./application";

// NOTE: IoCコンテナが実際に`Router`のインスタンスを必要とするタイミングで、`Router`を自動的にインスタンス化している場合はこのimport文はなくても動作する。
// 以下の理由によりこのimport文を追加する
// ・起動時に依存関係が適切に登録されることが保証されたい
// ・どの依存関係がアプリケーションで使用されているか一目でわかるようにするため、
import "../src/router/routerRegistration";

export { TypeExpress };