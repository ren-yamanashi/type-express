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

export const getParam = (
  path: string,
  url: string
): { [key: string]: any } | null => {
  const urlParts = url.split("/").reverse();
  const paths = path.split("/").reverse();
  let params: { [key: string]: any } = {};
  paths.forEach((p, i) => {
    if (/:/.test(p)) params[p.slice(1)] = urlParts[i];
  });

  if (Object.keys(params).length === 0) return null;
  return params;
};
