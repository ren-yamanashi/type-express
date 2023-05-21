import { Container, InjectionKey } from 'src/helper/container';

describe('Container', () => {
  it('should be able to register and resolve service', () => {
    const container = new Container();
    interface ServiceInterface {
      service: any;
    }
    const serviceKey: InjectionKey<ServiceInterface> = Symbol();
    const serviceInstance: ServiceInterface = {
      service: null,
    };

    container.register(serviceKey, serviceInstance);
    const resolvedInstance = container.resolve(serviceKey);
    expect(resolvedInstance).toBe(serviceInstance);
  });
});
