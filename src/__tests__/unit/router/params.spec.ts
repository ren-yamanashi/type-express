import { formatUrlPath, getParams } from 'src/app/router/params';

describe('formatUrlParams function', () => {
  it('should remove the trailing slash if it exists', () => {
    const input = '/test/url/1234/';
    const expected = '/test/url/1234';
    const result = formatUrlPath(input);
    expect(result).toBe(expected);
  });

  it('should not modify the string if there is no trailing slash', () => {
    const input = '/test/url';
    const expected = '/test/url';
    const result = formatUrlPath(input);
    expect(result).toBe(expected);
  });

  it('should handle empty string correctly', () => {
    const input = '';
    const expected = '';
    const result = formatUrlPath(input);
    expect(result).toBe(expected);
  });
});

describe('getParams function', () => {
  it('should extract parameters from the path and url', () => {
    const path = '/user/:id/books/:bookId';
    const url = '/user/123/books/1000';
    const expected = { id: '123', bookId: '1000' };
    const result = getParams(path, url);
    expect(result).toEqual(expected);
  });

  it('should return an empty object if there are no parameters', () => {
    const path = '/user/books';
    const url = '/user/books';
    const expected = {};
    const result = getParams(path, url);
    expect(result).toEqual(expected);
  });
});
