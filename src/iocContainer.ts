export class IoCContainer {
  private static instances: Map<string, any> = new Map();

  public static register<T>(key: string, instance: T): void {
    this.instances.set(key, instance);
  }

  public static resolve<T>(key: string): T {
    const instance = this.instances.get(key);
    if (!instance) {
      throw new Error(`Instance for key "${key}" is not registered`);
    }
    return instance;
  }
}
