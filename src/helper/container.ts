/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InjectionKey<T> extends Symbol {}

export class Container {
  protected services: Map<InjectionKey<unknown> | string, unknown> = new Map();

  register<T>(key: InjectionKey<T> | string, instance: T): void {
    this.services.set(key, instance);
  }

  resolve<T>(key: InjectionKey<T> | string): T {
    const instance = this.services.get(key);
    if (!instance) {
      const keyDescription = typeof key === 'symbol' ? key.description : key;
      throw new Error(`Service "${keyDescription}" not found`);
    }
    return instance as T;
  }
}
