import { isIncludeMessage } from './typeCheck';

export const convertToErrorClass = (error: unknown): Error => {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  if (isIncludeMessage(error)) return new Error(error.message);
  return new Error(`${error}`);
};
