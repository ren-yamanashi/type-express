import { Response, ResponseFactory } from 'src/app/response';
import { FileSystemKey, ProcessKey } from 'src/di';
import { HTTP_REQUEST_METHOD } from 'src/helper/constance';
import { Container } from 'src/helper/container';
import { PathLike } from 'src/interfaces/fileSystem';
import { FileSystemInterface } from 'src/interfaces/fileSystem';
import { ProcessInterface } from 'src/interfaces/process';

const httpResponseMock = {
  statusCode: 200,
  headers: {},
  setHeader: () => {},
  getHeaders: () => '' as any,
  write: () => {},
  end: () => {},
  redirect: () => {},
  req: {
    method: HTTP_REQUEST_METHOD.GET,
    headers: {
      host: 'localhost:8000',
      connection: '',
      accept: '',
      cookie: '',
    },
    url: '/users/2',
    body: '',
  },
};
describe('ResponseFactory', () => {
  const container = new Container();
  const fileSystem: FileSystemInterface = {
    async readFile(path: PathLike, options?: BufferEncoding | null) {
      return `path: ${path}, options: ${options}`;
    },
  };
  const process: ProcessInterface = {
    cwd() {
      return 'executed';
    },
  };
  container.register(FileSystemKey, fileSystem);
  container.register(ProcessKey, process);

  it('should create a new Response instance', () => {
    const factory = new ResponseFactory();
    const response = factory.create(httpResponseMock);
    expect(response).toBeInstanceOf(Response);
  });
});
