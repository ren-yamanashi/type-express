import { TypeExpressRequest } from '../request';
import { TypeExpressResponse } from '../response';

export type Handlers<T extends string> = (
  req: TypeExpressRequest<T>,
  res: TypeExpressResponse,
) => void;
