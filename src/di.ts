import { Container, InjectionKey } from './container';
import { _FileSystem } from './infrastructure/fileSystem';
import { Http } from './infrastructure/http';
import { FileSystem } from './interfaces/fileSystem';
import { HttpServerFactory } from './interfaces/http';
import { Router } from './router/route';

export const container = new Container();

export const HttpServerFactoryKey: InjectionKey<HttpServerFactory> = Symbol();
export const RouterKey: InjectionKey<Router> = Symbol();
export const FileSystemKey: InjectionKey<FileSystem> = Symbol();

export const registerDI = (): void => {
  container.register(HttpServerFactoryKey, new Http());
  container.register(RouterKey, new Router());
  container.register(FileSystemKey, new _FileSystem());
};
