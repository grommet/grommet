import React from 'react';
import { applyKey } from '../utils';

describe('applyKey function', () => {
  test('should return the element if it is a valid React element', () => {
    const element = <div>Test</div>;
    expect(applyKey(element)).toBe(element);
  });

  test('return undefined if option is null or undefined', () => {
    expect(applyKey(null)).toBeUndefined();
    expect(applyKey(undefined)).toBeUndefined();
  });

  test('apply key if key is a function', () => {
    const option = { value: 42 };
    const key = jest.fn().mockReturnValue(42);
    expect(applyKey(option, key)).toBe(42);
    expect(key).toHaveBeenCalledWith(option);
  });

  test('handle object keys and return first if no key is provided',
    () => {
    const option = { key1: 'value1', key2: 'value2' };
    expect(applyKey(option)).toBe('value1');
  });

  test('return empty object for empty object when no key is provided',
    () => {
    const option = {};
    expect(applyKey(option)).toEqual({});
  });

  test('apply key if key is an object with a key property', () => {
    const option = { key1: 'value1' };
    const key = { key: 'key1' };
    expect(applyKey(option, key)).toBe('value1');
  });
});
