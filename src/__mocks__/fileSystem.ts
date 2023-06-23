import { FileSystemInterface } from 'src/interfaces/fileSystem';

export const fsMock: FileSystemInterface = {
  readFile: () => Promise.resolve('Hello, world!'),
};
