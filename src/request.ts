import { IncomingMessage } from "http";

export class TypeExpressRequest {
  url!: string;
  params!: { [key: string]: any };
  constructor(private request: IncomingMessage) {}
  getParams(path: string, url: string): void {
    const urlParts = url.split("/").reverse();
    const paths = path.split("/").reverse();
    let params: { [key: string]: any } = {};
    paths.forEach((p, i) => {
      if (/:/.test(p)) params[p.slice(1)] = urlParts[i];
    });

    this.params = params;
  }
}
