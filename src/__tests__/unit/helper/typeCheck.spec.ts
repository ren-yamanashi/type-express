import { isIncludeMessage } from 'src/helper/typeCheck';
import { expect } from 'vitest';

describe('isIncludeMessage', () => {
  it('should return true if arg is an object with a message property of type string', () => {
    const arg = {
      message: 'test',
      otherProperty: 42,
    };
    const result = isIncludeMessage(arg);
    expect(result).toBe(true);
  });

  it('should return false if arg is an object without a message property', () => {
    const arg = {
      otherProperty: 42,
    };
    const result = isIncludeMessage(arg);
    expect(result).toBe(false);
  });

  it('should return false if arg is not an object', () => {
    const arg = 'I am not an object';
    const result = isIncludeMessage(arg);
    expect(result).toBe(false);
  });

  it('should return false if arg is an object with a message property of non-string type', () => {
    const arg = {
      message: 42,
    };
    const result = isIncludeMessage(arg);
    expect(result).toBe(false);
  });
});
