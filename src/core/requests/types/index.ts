import { HTTP_REQUEST_METHOD } from 'src/core/requests/constance';

export type HttpRequestMethod = (typeof HTTP_REQUEST_METHOD)[keyof typeof HTTP_REQUEST_METHOD];
