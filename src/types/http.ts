import {
  Server as HttpServer,
  IncomingMessage,
  ServerResponse as HttpSErverResponse,
  OutgoingHttpHeader,
} from "http";
import { Dict } from ".";

export type Server = HttpServer<
  typeof IncomingMessage,
  typeof HttpSErverResponse
>;

export type ServerResponse = HttpSErverResponse<IncomingMessage> & {
  req: IncomingMessage;
};

export type HttpMethodOptions = {
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