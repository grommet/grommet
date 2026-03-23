import { cx } from '../classes';

describe('cx', () => {
  test('filters falsy values and joins class names', () => {
    expect(cx('btn', 'btn-primary')).toBe('btn btn-primary');
  });

  test('filters out false values', () => {
    expect(cx('btn', false, 'btn-primary')).toBe('btn btn-primary');
  });

  test('filters out null values', () => {
    expect(cx('btn', null, 'btn-primary')).toBe('btn btn-primary');
  });

  test('filters out undefined values', () => {
    expect(cx('btn', undefined, 'btn-primary')).toBe('btn btn-primary');
  });

  test('filters out empty strings', () => {
    expect(cx('btn', '', 'btn-primary')).toBe('btn btn-primary');
  });

  test('handles multiple falsy values', () => {
    expect(cx('btn', false, null, undefined, '', 'btn-primary')).toBe(
      'btn btn-primary',
    );
  });

  test('returns single class name', () => {
    expect(cx('btn')).toBe('btn');
  });

  test('returns empty string when all values are falsy', () => {
    expect(cx(false, null, undefined, '')).toBe('');
  });

  test('preserves class name order', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c');
  });

  test('handles many arguments', () => {
    const result = cx('a', 'b', 'c', 'd', 'e', false, 'f');
    expect(result).toBe('a b c d e f');
  });
});
