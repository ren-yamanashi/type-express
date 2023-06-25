import * as path from 'path';
import { PathInterface } from '../interfaces/path';

export class Path implements PathInterface {
  public extName = path.extname;
  public resolve = path.resolve;
  public baseName = path.basename;
  public join = path.join;
}
