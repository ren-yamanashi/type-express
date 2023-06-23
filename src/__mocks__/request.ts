import { Request } from '../core/requests';
import { HttpRequest } from '../interfaces/http';
import { ExtractRouteParams } from '../core/routes/types/params';

export class MockRequest extends Request<string> {
  constructor(private _mockParams: { [key: string]: string }, private _mockBody: unknown) {
    super({} as HttpRequest); // HttpRequest is not used in your test cases
  }

  get params(): ExtractRouteParams<string> {
    return this._mockParams as unknown as ExtractRouteParams<string>;
  }

  get body(): { [key: string]: unknown } | undefined {
    return this._mockBody as { [key: string]: unknown };
  }
}
