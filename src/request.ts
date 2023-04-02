import { HttpRequest } from "./infrastructure/http.interface";
import { ExtractRouteParams } from "./types/route";

export class TypeExpressRequest<T extends string> {
  public params!: ExtractRouteParams<T>;

  constructor(private request: HttpRequest) {}
}
