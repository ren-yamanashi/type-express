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

  getParams(path: T, url: string): void {
    const urlParts = url.split("/").reverse();
    const paths = path.split("/").reverse();
    let params: Partial<ExtractRouteParams<T>> = {};
    paths.forEach((p, i) => {
      if (/:/.test(p))
        params[p.slice(1) as keyof ExtractRouteParams<T>] = String(
          urlParts[i]
        ) as ExtractRouteParams<T>[keyof ExtractRouteParams<T>];
    });

    this.params = params as ExtractRouteParams<T>;
  }
}
