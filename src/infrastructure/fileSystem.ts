import fs from 'fs';
import { FileSystemInterface } from 'src/interfaces/fileSystem';

export class FileSystem implements FileSystemInterface {
  public readFile = fs.promises.readFile;
}
