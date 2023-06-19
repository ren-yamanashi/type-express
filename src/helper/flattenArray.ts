export const flattenArray = <T, U>(input: (U | T | T[])[]): (T | U)[] => {
  return input.reduce<(T | U)[]>((acc, val) => {
    if (Array.isArray(val)) return acc.concat(flattenArray(val));
    return acc.concat(val);
  }, []);
};
