import { IncomingMessage } from "http";

export type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

export class TypeExpressRequest<T extends string> {
  url!: string;
  params!: ExtractRouteParams<T>;

  constructor(private request: IncomingMessage) {}
}
