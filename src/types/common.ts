import { TypeExpressRequest } from '../app/request';
import { TypeExpressResponse } from '../app/response';

export type Handlers<T extends string> = (
  req: TypeExpressRequest<T>,
  res: TypeExpressResponse,
) => void;
