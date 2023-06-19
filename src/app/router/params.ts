import { ExtractRouteParams } from 'src/types/route';

export const formatUrlParams = (urlParams: string): string => {
  const regex = /\/$/;
  if (regex.test(urlParams)) return urlParams.slice(0, -1);
  return urlParams;
};

/**
 *
 * @param path ex:`/user/:userId`
 * @param url ex: `/user/1/`
 * @returns ex: {userId: 1}
 * ex: arg: ("/user/:id", "/user/sample-user-id") -> res: {id: "sample-user-id"}
 *     arg: ("/user/:id/books/:bookId", "/user/123/books/1000") -> res: {id: "123",bookId: "1000"}
 */
export const getParams = <T extends string>(path: T, url: string): ExtractRouteParams<T> => {
  const urlParts = url.split('/').reverse();
  const paths = path.split('/').reverse();
  // eslint-disable-next-line prefer-const
  let params: Partial<ExtractRouteParams<T>> = {};
  for (let i = 0; i <= paths.length; i++) {
    const path = paths[i];
    const urlPart = urlParts[i];
    if (/:/.test(paths[i])) {
      params[path.slice(1) as keyof ExtractRouteParams<T>] = String(
        urlPart,
      ) as ExtractRouteParams<T>[keyof ExtractRouteParams<T>];
    }
  }
  return params as ExtractRouteParams<T>;
};
