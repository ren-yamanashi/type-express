import { Container, InjectionKey } from 'src/helper/container';

describe('Container', () => {
  const TestKey: InjectionKey<string> = Symbol('TestKey');
  const TestInstance = 'Test Instance';

  it('should register and resolve services', () => {
    const container = new Container();
    container.register(TestKey, TestInstance);

    const resolvedInstance = container.resolve(TestKey);

    expect(resolvedInstance).toBe(TestInstance);
  });

  it('should register and resolve services with string key', () => {
    const container = new Container();
    const stringKey = 'stringKey';
    container.register(stringKey, TestInstance);

    const resolvedInstance = container.resolve(stringKey);

    expect(resolvedInstance).toBe(TestInstance);
  });

  it('should throw error when trying to resolve unregistered service with string key', () => {
    const container = new Container();
    const stringKey = 'stringKey';
    expect(() => container.resolve(stringKey)).toThrow(`Service "${stringKey}" not found`);
  });
});
