import { convertJSONtoObject } from '../helper/convert';
import { HttpRequest } from '../interfaces/http';
import { ExtractRouteParams } from '../types/route';

export class RequestFactory {
  public create<T extends string>(req: HttpRequest): Request<T> {
    return new Request<T>(req);
  }
}

export class Request<T extends string> {
  private _params!: ExtractRouteParams<T>;
  private _body!: unknown;

  constructor(private request: HttpRequest) {}

  public setParams(params: ExtractRouteParams<T>) {
    this._params = params;
  }
  public setBody(body: unknown) {
    this._body = body;
  }

  get params(): ExtractRouteParams<T> {
    return this._params;
  }
  get body(): { [key: string]: unknown } | undefined {
    // TODO: binary and text
    const obj = convertJSONtoObject(this._body);
    // TODO: error handling
    if (obj instanceof Error) return;

    return obj;
  }
}
