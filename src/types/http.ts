import {
  Server as HttpServer,
  IncomingMessage,
  ServerResponse as HttpSErverResponse,
} from "http";

export type Server = HttpServer<
  typeof IncomingMessage,
  typeof HttpSErverResponse
>;

export type ServerResponse = HttpSErverResponse<IncomingMessage> & {
  req: IncomingMessage;
};
