export const isIncludeMessage = (arg: unknown): arg is { message: string } =>
  arg !== null &&
  typeof arg === 'object' &&
  'message' in arg &&
  typeof (arg as { message: unknown }).message === 'string';
