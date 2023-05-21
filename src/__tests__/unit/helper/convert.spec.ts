import { convertJSONtoObject, convertToErrorClass } from 'src/helper/convert';

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

describe('convertJSONtoObject function', () => {
  const validJSON = '{"name":"John", "age":30, "city":"New York"}';
  const invalidJSON = '{"name": "John", age:}';
  const obj = { name: 'John', age: 39, city: 'Tokyo' };
  it('should return a JavaScript object when passed a valid JSON string', () => {
    const result = convertJSONtoObject(validJSON);
    expect(result).toEqual({
      name: 'John',
      age: 30,
      city: 'New York',
    });
  });
  it('should return a JavaScript object when passed a object', () => {
    const result = convertJSONtoObject(obj);
    expect(result).toEqual({
      name: 'John',
      age: 39,
      city: 'Tokyo',
    });
  });

  it('should return an Error when passed an invalid JSON string', () => {
    const result = convertJSONtoObject(invalidJSON);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toMatch(/Failed to parse JSON:/);
  });

  it('should return an Error when passed a non-string', () => {
    const result = convertJSONtoObject(42);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Input must be a string');
  });
});