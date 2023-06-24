import { Request } from 'src/core/request';
import { Response } from 'src/core/response';

export type MiddlewareHandler<T extends string> = (
  req: Request<T>,
  res: Response,
  next: () => void,
  err?: unknown,
) => unknown;
