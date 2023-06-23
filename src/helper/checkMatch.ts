/**
 * @param path ex:`/user/:userId`
 * @param url ex: `/user/1/`
 * ex:  "/user/:id/books/:bookId", "/user/123/books/sample-book-id" -> true
 *      "/user/:id", "/user/books/sample-book-id" -> false
 */
export const checkMatchRoutePathWithUrl = (path: string, url: string): boolean => {
  if (path.slice(-1) !== '/') path = `${path}/`;
  if (url.slice(-1) !== '/') url = `${url}/`;
  const urlParts = url.split('/');
  const paths = path.split('/');
  if (urlParts.length !== paths.length) return false;
  return paths.every((p, i) => (!/:/.test(p) ? p === urlParts[i] : true));
};
