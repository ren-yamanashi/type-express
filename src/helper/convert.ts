/* eslint-disable @typescript-eslint/no-unsafe-return */
import { isIncludeMessage } from './typeCheck';

export const convertToErrorClass = (error: unknown): Error => {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  if (isIncludeMessage(error)) return new Error(error.message);
  return new Error(`${error}`);
};

export const convertJSONtoObject = (arg: unknown): { [key: string]: unknown } | Error => {
  if (arg !== null && typeof arg === 'object') {
    return arg as { [key: string]: unknown };
  }
  if (typeof arg !== 'string') {
    return new Error('Input must be a string');
  }
  try {
    return JSON.parse(arg);
  } catch (error) {
    return new Error(`Failed to parse JSON: ${error}`);
  }
};
