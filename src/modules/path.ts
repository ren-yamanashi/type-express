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
