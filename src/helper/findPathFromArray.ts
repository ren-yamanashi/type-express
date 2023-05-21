export const findPathFromArray = (arr: unknown[]): string | undefined => {
  for (const val of arr) {
    if (typeof val === 'string') {
      return val;
    }
  }
};
