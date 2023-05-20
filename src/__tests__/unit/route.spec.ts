import { Router } from 'src/app/router/route';
import { HTTP_REQUEST_METHOD } from 'src/helper/constance';

describe('RouteRegistry', () => {
    const router = new Router();
  it('should set the map correctly', () => {
    const path = '/users/:id';
    const handlers = (req: any, res: any) => {};
    const method = HTTP_REQUEST_METHOD.GET;
    router.setRouteRegistry({
      path,
      handlers,
      method,
    });
    const routeRegistry = router.getRouteRegistry(path)
    expect(routeRegistry?.handlers).toEqual(handlers)
    expect(routeRegistry?.method).toEqual(method);
  });
  it('no value matches key in map', () => {
    const path = '/users/:id';
    const handlers = (req: any, res: any) => {};
    const method = HTTP_REQUEST_METHOD.GET;
    router.setRouteRegistry({
      path,
      handlers,
      method,
    });
    const routeRegistry = router.getRouteRegistry("sampleKey");
    expect(routeRegistry?.handlers).toEqual(undefined);
    expect(routeRegistry?.method).toEqual(undefined);
  });
});
