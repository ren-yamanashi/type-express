/**
 * should remove the trailing slash if it exists
 * @param urlPath ex: `/users/1234/`
 * @returns ex: `/users/1234`
 */
export const removeTrailingSlash = (urlParams: string): string => {
  const regex = /\/$/;
  if (regex.test(urlParams)) return urlParams.slice(0, -1);
  return urlParams;
};

export const flattenArray = <T, U>(input: (U | T | T[])[]): (T | U)[] => {
  return input.reduce<(T | U)[]>((acc, val) => {
    if (Array.isArray(val)) return acc.concat(flattenArray(val));
    return acc.concat(val);
  }, []);
};
