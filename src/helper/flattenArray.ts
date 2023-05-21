export const flattenArray = (input: any[]): any[] =>
  input.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)),
    [],
  );
