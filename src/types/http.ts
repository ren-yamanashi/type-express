import { HTTP_REQUEST_METHOD } from 'src/common/http/constance';

export type HttpRequestMethod = (typeof HTTP_REQUEST_METHOD)[keyof typeof HTTP_REQUEST_METHOD];
