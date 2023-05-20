import { Request, RequestFactory } from 'src/app/request';
import { HTTP_REQUEST_METHOD } from 'src/helper/constance';

const httpRequestMock = {
  method: HTTP_REQUEST_METHOD.GET,
  headers: {},
  url: '/users/2',
  body: '',
};
describe('RequestFactory', () => {
  it('should create a new Request instance', () => {
    const factory = new RequestFactory();
    const request = factory.create(httpRequestMock);
    expect(request).toBeInstanceOf(Request);
  });
});

describe('RequestParams', () => {
  it('should set param', () => {
    const requestFactory = new RequestFactory();
    const request = requestFactory.create(httpRequestMock);
    request.setParams({ id: '2' });
    expect(request.params).toEqual({ id: '2' });
  });
  it('prams not typeof string', () => {
    const requestFactory = new RequestFactory();
    const request = requestFactory.create(httpRequestMock);
    const values = [1, null, undefined, ['1', '2'], { sample: '1' }];
    for (const val of values) {
      request.setParams({ test: val });
      expect(request.params).toEqual({ test: val });
    }
  });
});
