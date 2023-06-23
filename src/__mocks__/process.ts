import { ProcessInterface } from 'src/interfaces/process';

export const processMock: ProcessInterface = {
  cwd: () => {
    return '/current/working/directory';
  },
};
