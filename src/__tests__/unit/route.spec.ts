import { RequestFactory } from 'src/app/request';
import { ResponseFactory } from 'src/app/response';
import { Router } from 'src/app/router/route';
import { HTTP_REQUEST_METHOD } from 'src/helper/constance';

describe('RouteRegistry', () => {
  const requestFactory = new RequestFactory();
  const responseFactory = new ResponseFactory();
  const router = new Router(requestFactory, responseFactory);
  const path = '/users/:id';
  const handlers = (req: any, res: any) => {};
  const method = HTTP_REQUEST_METHOD.GET;
  it('should set the map correctly', () => {
    router.setRouteRegistry({
      path,
      handlers,
      method,
    });
    const routeRegistry = router.getRouteRegistry(path);
    expect(routeRegistry?.handlers).toEqual(handlers);
    expect(routeRegistry?.method).toEqual(method);
  });
  it('no value matches key in map', () => {
    router.setRouteRegistry({
      path,
      handlers,
      method,
    });
    const routeRegistry = router.getRouteRegistry('sampleKey');
    expect(routeRegistry?.handlers).toEqual(undefined);
    expect(routeRegistry?.method).toEqual(undefined);
  });
});
