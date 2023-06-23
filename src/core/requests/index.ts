import { convertJSONtoObject } from '../../helper/convert';
import { HttpRequest } from '../../interfaces/http';
import { ExtractRouteParams } from '../routes/types/params';

export class RequestFactory {
  public create<T extends string>(req: HttpRequest): Request<T> {
    return new Request<T>(req);
  }
}

export class Request<T extends string> {
  private _params!: ExtractRouteParams<T>;
  private _body!: unknown;
  constructor(private readonly request: HttpRequest) {}

  /**
   *
   * @param path ex:`/user/:userId`
   * @param url ex: `/user/1/`
   * @returns ex: {userId: 1}
   * ex: arg: ("/user/:id", "/user/sample-user-id") -> res: {id: "sample-user-id"}
   *     arg: ("/user/:id/books/:bookId", "/user/123/books/1000") -> res: {id: "123",bookId: "1000"}
   */
  public setParams<T extends string>(path: T, url: string): void {
    const urlParts = url.split('/').reverse();
    const paths = path.split('/').reverse();
    let params: Partial<ExtractRouteParams<T>> = {};
    for (let i = 0; i <= paths.length; i++) {
      const path = paths[i];
      const urlPart = urlParts[i];
      if (/:/.test(paths[i])) {
        params[path.slice(1) as keyof ExtractRouteParams<T>] = String(
          urlPart,
        ) as ExtractRouteParams<T>[keyof ExtractRouteParams<T>];
      }
    }

    const extractedRouteParams = params as ExtractRouteParams<T>;
    if (!extractedRouteParams) return;
    this._params = extractedRouteParams;
  }

  public setBody() {
    this._body = this.request.body;
  }

  get params(): ExtractRouteParams<T> {
    return this._params;
  }

  get body(): { [key: string]: unknown } | undefined {
    // TODO: binary and text
    const obj = convertJSONtoObject(this._body);
    if (obj instanceof Error) {
      console.error(obj);
      return;
    }
    return obj;
  }
}
