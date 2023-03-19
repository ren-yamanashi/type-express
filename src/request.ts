import { IncomingMessage } from "http";

export class TypeExpressRequest {
  url!: string;
  params!: string;
  constructor(private request: IncomingMessage) {}
}
