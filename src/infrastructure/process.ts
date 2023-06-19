import process from 'process';
import { ProcessInterface } from 'src/interfaces/process';

export class Process implements ProcessInterface {
  public cwd = process.cwd;
}
