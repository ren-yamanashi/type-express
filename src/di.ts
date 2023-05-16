import { Container, InjectionKey } from "./container";
import { Http } from "./infrastructure/http";
import { HttpServerFactory } from "./interfaces/http";
import { Router } from "./router/route";

export const container = new Container();

export const HttpServerFactoryKey: InjectionKey<HttpServerFactory> = Symbol();
export const RouterKey: InjectionKey<Router> = Symbol();

export const registerDI = (): void => {
  container.register(HttpServerFactoryKey, new Http());
  container.register(RouterKey, new Router());
};
