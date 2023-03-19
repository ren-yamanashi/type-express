import { IncomingMessage } from "http";

export class TypeExpressRequest {
  params!: string;
  constructor(private request: IncomingMessage) {}
}
