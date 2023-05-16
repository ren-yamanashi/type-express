export interface InjectionKey<T> extends Symbol {}

export class Container {
  private services: Map<InjectionKey<unknown> | string, any> = new Map();

  public register<T>(key: InjectionKey<T> | string, instance: T): void {
    this.services.set(key, instance);
  }

  public resolve<T>(key: InjectionKey<T> | string): T {
    const instance = this.services.get(key);
    if (!instance) {
      throw new Error(`Service "${key}" not found`);
    }
    return instance as T;
  }
}
