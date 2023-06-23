import { Request } from 'src/core/requests';
import { Response } from 'src/core/responses';

export type RouterHandler<T extends string> = (req: Request<T>, res: Response) => void;
