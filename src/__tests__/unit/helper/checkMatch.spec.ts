import { checkMatchRoutePathWithUrl } from 'src/helper/checkMatch';

describe('checkMatchRoutePathWithUrl', () => {
  it('should return true when path and URL exactly match', () => {
    const path = '/user/books';
    const url = '/user/books';
    const result = checkMatchRoutePathWithUrl(path, url);
    expect(result).toBe(true);
  });

  it('should return true when path includes parameters and URL provides matching values', () => {
    const path = '/user/:id/books/:bookId';
    const url = '/user/123/books/sample-book-id';
    const result = checkMatchRoutePathWithUrl(path, url);
    expect(result).toBe(true);
  });

  it('should return false when the URL does not provide values for the path parameters', () => {
    const path = '/user/:id';
    const url = '/user/books/sample-book-id';
    const result = checkMatchRoutePathWithUrl(path, url);
    expect(result).toBe(false);
  });

  it('should return false when path and URL have different structures', () => {
    const path = '/user/:id/books';
    const url = '/user/sample-user-id';
    const result = checkMatchRoutePathWithUrl(path, url);
    expect(result).toBe(false);
  });

  it('should return true even when trailing slashes are missing', () => {
    const path = '/user/:id/books';
    const url = '/user/123/books';
    const result = checkMatchRoutePathWithUrl(path, url);
    expect(result).toBe(true);
  });
});
