import { Server, IncomingMessage, ServerResponse } from "http";

export type HttpServer = Server<typeof IncomingMessage, typeof ServerResponse>;
export type HttpServerRequest = IncomingMessage;
export type HttpServerResponse = ServerResponse<IncomingMessage> & {
  req: HttpServerRequest;
};
