import { findFirstStrFromArr } from 'src/helper/find';

describe('findPathFromArray', () => {
  it('should return the first string from a mixed array', () => {
    const result = findFirstStrFromArr([1, 'test', 3, 'another test']);
    expect(result).toBe('test');
  });

  it('should return the first string from an all string array', () => {
    const result = findFirstStrFromArr(['first', 'second', 'third']);
    expect(result).toBe('first');
  });

  it('should return undefined from an empty array', () => {
    const result = findFirstStrFromArr([]);
    expect(result).toBeUndefined();
  });
});
