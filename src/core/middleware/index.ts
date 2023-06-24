import { Request } from '../request';
import { Response } from '../response';
import { MiddlewareHandler } from './types';

export class Middleware {
  private readonly middlewareRegistry = new Map<string, MiddlewareHandler<any>[]>();

  public getRegistry<T extends string>(key: string): Array<MiddlewareHandler<T>> | undefined {
    return this.middlewareRegistry.get(key);
  }

  public setRegistry<T extends string>(key: string, handlers: MiddlewareHandler<T>[]): void {
    if (this.middlewareRegistry.has(key)) {
      this.middlewareRegistry.get(key)?.push(...handlers);
      return;
    }
    this.middlewareRegistry.set(key, handlers);
  }

  /**
   * Iterates through the registered routes, and when a matching route is found,
   * calls the associated handlers with the request and response objects.
   *
   * @param req - An HttpRequest object representing the incoming request.
   * @param res - An HttpServerResponseIncludeRequest object representing the server response.
   */
  public executeHandlers(routePath: string, request: Request<string>, response: Response): void {
    for (const path of this.middlewareRegistry.keys()) {
      let currentHandlerIdx = 0;
      const handlers = this.getRegistry(path);
      if ((path !== routePath && path !== '*') || !handlers?.length) break;

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
