import { Middleware } from 'src/core/middlewares';
import { MiddlewareHandler } from 'src/core/middlewares/types';

describe('Middleware', () => {
  describe('setRegistry', () => {
    it('should set handlers for a new route', () => {
      const middleware = new Middleware();
      const handlers: MiddlewareHandler<string>[] = [
        (req, res, next) => {},
        (req, res, next) => {},
      ];
      middleware.setRegistry('/route', handlers);
      expect(middleware.getRegistry('/route')).toEqual(handlers);
    });

    it('should append handlers for an existing route', () => {
      const middleware = new Middleware();
      const handlers1: MiddlewareHandler<string>[] = [
        (req, res, next) => {
          return 'a';
        },
        (req, res, next) => {
          return 'b';
        },
      ];
      const handlers2: MiddlewareHandler<string>[] = [
        (req, res, next) => {},
        (req, res, next) => {},
      ];
      const newHandlers: MiddlewareHandler<string>[] = [...handlers1, ...handlers2];
      middleware.setRegistry('/route2', handlers1);
      middleware.setRegistry('/route2', handlers2);
      expect(middleware.getRegistry('/route2')).toEqual(newHandlers);
    });
  });
});
