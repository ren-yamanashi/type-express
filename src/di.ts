import { Container, InjectionKey } from './helper/container';
import { FileSystem } from './infrastructure/fileSystem';
import { HttpServerFactory } from './infrastructure/http';
import { FileSystemInterface } from './interfaces/fileSystem';
import { HttpServerFactoryInterface } from './interfaces/http';
import { Router } from './core/router';
import { ProcessInterface } from './interfaces/process';
import { Process } from './infrastructure/process';
import { RequestFactory } from './core/request';
import { ResponseFactory } from './core/response';
import { Middleware } from './core/middleware';

export const container = new Container();

export const httpServerFactoryKey: InjectionKey<HttpServerFactoryInterface> = Symbol();
export const fileSystemKey: InjectionKey<FileSystemInterface> = Symbol();
export const processKey: InjectionKey<ProcessInterface> = Symbol();
export const routerKey: InjectionKey<Router> = Symbol();
export const middlewareKey: InjectionKey<Middleware> = Symbol();

export const registerContainer = (): void => {
  // infrastructure
  container.register(httpServerFactoryKey, new HttpServerFactory());
  container.register(fileSystemKey, new FileSystem());
  container.register(processKey, new Process());
  // other
  const requestFactory = new RequestFactory();
  const responseFactory = new ResponseFactory();
  container.register(routerKey, new Router(requestFactory, responseFactory));
  container.register(middlewareKey, new Middleware());
};
