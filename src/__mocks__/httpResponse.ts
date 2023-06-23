import { HttpResponse } from 'src/interfaces/http';

export const httpResponseMock: HttpResponse = {
  statusCode: 200,
  headers: { responseHeader: 'sampleValue' },
  setHeader(key, value) {},
  getHeaders() {
    return {
      responseHeader: 200,
    };
  },
  write(content) {},
  end(chunk) {},
  redirect(status, url) {},
};
