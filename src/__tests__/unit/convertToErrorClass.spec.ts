import { convertToErrorClass } from 'src/helper/convertToErrorClass';

describe('convertToErrorClass', () => {
  it('should return the same instance if error is already an instance of Error', () => {
    const error = new Error('Existing error');

    const result = convertToErrorClass(error);

    expect(result).toBe(error);
  });

  it('should create a new Error instance with the same message if error is a string', () => {
    const error = 'Error message';

    const result = convertToErrorClass(error);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(error);
  });

  it('should create a new Error instance with the message property if error is an object with a message property', () => {
    const error = { message: 'Error message' };

    const result = convertToErrorClass(error);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(error.message);
  });

  it('should create a new Error instance with the stringified object as the message if error is an object without a message property', () => {
    const error = { key: 'value' };
    
    const result = convertToErrorClass(error);

    expect(result).toBeInstanceOf(Error);
  });
});
