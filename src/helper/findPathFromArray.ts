export const findPathFromArray = (arr: unknown[]): string | undefined => {
  const paths: string[] = [];
  for (const val of arr) {
    if (typeof val === 'string') paths.push(val);
  }
  return paths[0];
};
