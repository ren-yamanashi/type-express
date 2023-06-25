export interface PathInterface {
  extName(path: string): string;
  resolve(...paths: string[]): string;
  baseName(path: string, suffix?: string): string;
  join(...paths: string[]): string;
}
