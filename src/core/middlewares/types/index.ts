import { Request } from 'src/core/requests';
import { Response } from 'src/core/responses';

export type MiddlewareHandler<T extends string> = (
  req: Request<T>,
  res: Response,
  next: () => void,
  err?: unknown,
) => unknown;
