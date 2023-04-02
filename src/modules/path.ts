import { ExtractRouteParams } from "../types/route";

export const matchPathWithUrl = (path: string, url: string): boolean => {
  if (path.slice(-1) !== "/") path = `${path}/`;
  if (url.slice(-1) !== "/") url = `${url}/`;

  const urlParts = url.split("/");
  const paths = path.split("/");
  if (urlParts.length !== paths.length) return false;
  return !paths
    .map((p, i) => (!/:/.test(p) ? p === urlParts[i] : true))
    .includes(false);
};

export const getParams = <T extends string>(
  path: T,
  url: string
): ExtractRouteParams<T> => {
  const urlParts = url.split("/").reverse();
  const paths = path.split("/").reverse();
  let params: Partial<ExtractRouteParams<T>> = {};

  paths.forEach((p, i) => {
    if (/:/.test(p))
      params[p.slice(1) as keyof ExtractRouteParams<T>] = String(
        urlParts[i]
      ) as ExtractRouteParams<T>[keyof ExtractRouteParams<T>];
  });

  return params as ExtractRouteParams<T>;
};
