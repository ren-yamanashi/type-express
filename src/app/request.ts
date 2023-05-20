import { HttpRequest } from '../interfaces/http';
import { ExtractRouteParams } from '../types/route';

export class RequestFactory {
  public create<T extends string>(req: HttpRequest): Request<T> {
    return new Request<T>(req);
  }
}

export class Request<T extends string> {
  private _params!: ExtractRouteParams<T>;

  constructor(private request: HttpRequest) {}

  public setParams(params: ExtractRouteParams<T>) {
    this._params = params;
  }

  get params(): ExtractRouteParams<T> {
    return this._params;
  }
}
