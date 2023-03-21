import { IncomingMessage } from "http";

export type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

export class TypeExpressRequest {
  url!: string;
  params!: {
    [key: string]: string;
  };

  constructor(private request: IncomingMessage) {}

  getParams(path: string, url: string): void {
    const urlParts = url.split("/").reverse();
    const paths = path.split("/").reverse();
    let params: { [key: string]: any } = {};
    paths.forEach((p, i) => {
      if (/:/.test(p)) params[p.slice(1)] = String(urlParts[i]);
    });

    this.params = params;
  }
}
