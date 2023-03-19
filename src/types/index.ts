import { TypeExpressRequest } from "../request";
import { TypeExpressResponse } from "../response";

export type Handlers = (
  req: TypeExpressRequest,
  res: TypeExpressResponse
) => void;
