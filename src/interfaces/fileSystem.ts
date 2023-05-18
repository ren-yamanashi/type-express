export type PathLike = string | Buffer | URL;
export type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';
export interface FileSystemInterface {
  readFile(path: PathLike, options?: BufferEncoding | null): Promise<string | Buffer>;
}
