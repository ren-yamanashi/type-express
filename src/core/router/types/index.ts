import { Request } from 'src/core/request';
import { Response } from 'src/core/response';

export type RouterHandler<T extends string> = (req: Request<T>, res: Response) => void;
