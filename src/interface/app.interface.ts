import { Server } from "../types/http";

export interface App {
  listen: (port: number, writeText: string) => void;
  get: (path?: string) => void;
}
