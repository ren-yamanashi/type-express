import { convertToErrorClass } from './convert';

type SafeExecuteResult<T> = {
  data?: T;
  error?: Error;
};

export const safeExecute = async <T>(
  asyncFunc: () => Promise<T>,
): Promise<SafeExecuteResult<T>> => {
  try {
    const data = await asyncFunc();
    return {
      data,
    };
  } catch (err: unknown) {
    const error: Error = convertToErrorClass(err);
    return { error };
  }
};
