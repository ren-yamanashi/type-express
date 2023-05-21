
import { safeExecute } from 'src/helper/safeExecute';
import { expect } from 'vitest';

describe('safeExecute', () => {
  it('should return data when asyncFunc is successful', async () => {
    const asyncFunc = async () => 'test';

    const result = await safeExecute(asyncFunc);

    expect(result).toHaveProperty('data', 'test');
    expect(result).not.toHaveProperty('error');
  });

  it('should return an error when asyncFunc throws', async () => {
    const errorMessage = 'Test error';
    const asyncFunc = async () => {
      throw new Error(errorMessage);
    };

    const result = await safeExecute(asyncFunc);

    expect(result).toHaveProperty('error');
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe(errorMessage);
    expect(result).not.toHaveProperty('data');
  });
});
