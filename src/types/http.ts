import { HTTP_REQUEST_METHOD } from 'src/helper/constance';

export type HttpRequestMethod = (typeof HTTP_REQUEST_METHOD)[keyof typeof HTTP_REQUEST_METHOD];
