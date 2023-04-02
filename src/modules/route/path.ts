import { ExtractRouteParams } from "../../types/route/extractRouteParams";

export const matchPathWithUrl = (path: string, url: string): boolean => {
  if (path.slice(-1) !== "/") path = `${path}/`;
  if (url.slice(-1) !== "/") url = `${url}/`;

  const urlParts = url.split("/");
  const paths = path.split("/");

  if (urlParts.length !== paths.length) return false;

  return paths.every((p, i) => (!/:/.test(p) ? p === urlParts[i] : true));
};

export const getParams = <T extends string>(
  path: T,
  url: string
): ExtractRouteParams<T> => {
  const urlParts = url.split("/").reverse();
  const paths = path.split("/").reverse();
  let params: Partial<ExtractRouteParams<T>> = {};

  for (let i = 0; i <= paths.length; i++) {
    const path = paths[i];
    const urlPart = urlParts[i];
    if (/:/.test(paths[i])) {
      params[path.slice(1) as keyof ExtractRouteParams<T>] = String(
        urlPart
      ) as ExtractRouteParams<T>[keyof ExtractRouteParams<T>];
    }
  }

  return params as ExtractRouteParams<T>;
};
