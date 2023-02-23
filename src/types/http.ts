import {
  Server,
  IncomingMessage,
  ServerResponse,
  OutgoingHttpHeader,
} from "http";
import { Dict } from ".";

export type HttpServer = Server<typeof IncomingMessage, typeof ServerResponse>;

export interface HttpMethodOptions {
  host: string;
  port: number;
  path: string;
  method: string;
};

export type GetMethodOptions = HttpMethodOptions;

export type PostMethodOptions = HttpMethodOptions & {
  headers: Dict<OutgoingHttpHeader>;
  data: string;
};