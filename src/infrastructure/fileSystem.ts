import fs from "fs"
import { FileSystem, PathLike, BufferEncoding } from 'src/interfaces/fileSystem';


export class _FileSystem implements FileSystem {
  public  readFile = fs.promises.readFile
}