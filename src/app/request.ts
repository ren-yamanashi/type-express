import { HttpRequest } from '../interfaces/http';
import { ExtractRouteParams } from '../types/route';

export class RequestFactory {
  public create<T extends string>(req: HttpRequest): Request<T> {
    return new Request<T>(req);
  }
}

export class Request<T extends string> {
  private _params!: ExtractRouteParams<T>;
  private _body!: any;

  constructor(private request: HttpRequest) {}

  public setParams(params: ExtractRouteParams<T>) {
    this._params = params;
  }
  public setBody() {
    this._body = this.request.body;
  }

  get params(): ExtractRouteParams<T> {
    return this._params;
  }
  get body(): any {
    return this._body;
  }
}
