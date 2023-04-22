class DIContainer {
  private services: Map<string, any> = new Map();

  public register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }

  public resolve<T>(key: string): T {
    const instance = this.services.get(key);
    if (!instance) {
      throw new Error(`Instance for key "${key}" is not registered`);
    }
    return instance as T;
  }
}
export const container = new DIContainer();
