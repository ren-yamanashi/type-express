import { Container, InjectionKey } from './helper/container';
import { FileSystem } from './infrastructure/fileSystem';
import { HttpServerFactory } from './infrastructure/http';
import { FileSystemInterface } from './interfaces/fileSystem';
import { HttpServerFactoryInterface } from './interfaces/http';
import { Router } from './app/router/route';
import { ProcessInterface } from './interfaces/process';
import { Process } from './infrastructure/process';

export const container = new Container();

export const HttpServerFactoryKey: InjectionKey<HttpServerFactoryInterface> = Symbol();
export const RouterKey: InjectionKey<Router> = Symbol();
export const FileSystemKey: InjectionKey<FileSystemInterface> = Symbol();
export const ProcessKey: InjectionKey<ProcessInterface> = Symbol();

export const registerDI = (): void => {
  container.register(HttpServerFactoryKey, new HttpServerFactory());
  container.register(RouterKey, new Router());
  container.register(FileSystemKey, new FileSystem());
  container.register(ProcessKey, new Process());
};
