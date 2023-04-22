import { HttpRequest } from "./interfaces/http";
import { ExtractRouteParams } from "./types/route";

export class TypeExpressRequest<T extends string> {
  public params!: ExtractRouteParams<T>;

  constructor(private request: HttpRequest) {}
}
