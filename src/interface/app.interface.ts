import { Server } from "../types/http";

export interface App {
  listen: (port: number, listeningListener?: () => void) => void;
}
