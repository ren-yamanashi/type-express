import { Request } from './request';
import { Response } from './response';

export type MiddlewareHandler<T extends string> = (
  req: Request<T>,
  res: Response,
  next: () => void,
  err?: unknown,
) => unknown;

export class Middleware {
  private middlewareRegistry = new Map<string, MiddlewareHandler<any>[]>();

  public setMiddlewareRegistry<T extends string>(
    key: string,
    handlers: MiddlewareHandler<T>[],
  ): void {
    if (this.middlewareRegistry.has(key)) {
      this.middlewareRegistry.get(key)?.push(...handlers);
      return;
    }
    this.middlewareRegistry.set(key, handlers);
  }

  public getMiddlewareRegistry<T extends string>(
    key: string,
  ): Array<MiddlewareHandler<T>> | undefined {
    return this.middlewareRegistry.get(key);
  }

  public executeHandlers(routePath: string, request: Request<string>, response: Response) {
    for (const path of this.middlewareRegistry.keys()) {
      let currentHandlerIdx = 0;
      const handlers = this.getMiddlewareRegistry(path);
      if ((path !== routePath && path !== '*') || !handlers?.length) break;

      // TODO: error handling
      const next = () => {
        currentHandlerIdx++;
        if (!handlers[currentHandlerIdx]) return;
        handlers[currentHandlerIdx](request, response, next);
      };

      handlers[currentHandlerIdx](request, response, next);

      // NOTE: next() was not called in the last middleware, so stop processing
      if (currentHandlerIdx < handlers.length) break;
    }
  }
}
