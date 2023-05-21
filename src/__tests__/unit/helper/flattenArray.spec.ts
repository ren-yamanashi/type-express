import { flattenArray } from 'src/helper/flattenArray';

describe('flattenArray', () => {
  it('should flatten a deeply nested array', () => {
    const nestedArray = [1, [2, [3, [4, [5], 6], 7], 8], 9];
    const result = flattenArray(nestedArray);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(result).toEqual(expected);
  });

  it('should return the same array if no nesting', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = flattenArray(array);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(result).toEqual(expected);
  });

  it('should return an empty array if given an empty array', () => {
    const array: any[] = [];
    const result = flattenArray(array);
    const expected: any[] = [];
    expect(result).toEqual(expected);
  });
});
