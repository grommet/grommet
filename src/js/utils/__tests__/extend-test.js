import { resolveExtend } from '../extend';

// Mock console.warn globally across all tests
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  console.warn.mockRestore();
});

describe('resolveExtend', () => {
  describe('string extend', () => {
    test('parses simple CSS string', () => {
      const result = resolveExtend('color: red; font-size: 14px;', {});
      expect(result).toEqual({ color: 'red', fontSize: '14px' });
    });

    test('handles values with colons (e.g. rgb())', () => {
      const result = resolveExtend('color: rgb(255, 0, 0);', {});
      expect(result).toEqual({ color: 'rgb(255, 0, 0)' });
    });

    test('handles background images with url()', () => {
      const result = resolveExtend(
        'background-image: url(data:image/svg);',
        {},
      );
      expect(result).toEqual({ backgroundImage: 'url(data:image/svg)' });
    });

    test('converts kebab-case to camelCase', () => {
      const result = resolveExtend(
        'font-weight: bold; text-decoration: underline;',
        {},
      );
      expect(result).toEqual({
        fontWeight: 'bold',
        textDecoration: 'underline',
      });
    });

    test('handles trailing semicolon', () => {
      const result = resolveExtend('color: blue;', {});
      expect(result).toEqual({ color: 'blue' });
    });

    test('returns undefined for empty string', () => {
      const result = resolveExtend('', {});
      expect(result).toBeUndefined();
    });
  });

  describe('function extend', () => {
    test('resolves function that returns CSS string', () => {
      const extend = (props) =>
        props.primary ? 'font-weight: bold; color: blue;' : 'color: gray;';
      const result = resolveExtend(extend, { primary: true });
      expect(result).toEqual({ fontWeight: 'bold', color: 'blue' });
    });

    test('passes props to extend function', () => {
      const extend = (props) =>
        props.disabled ? 'opacity: 0.5;' : 'opacity: 1;';
      expect(resolveExtend(extend, { disabled: true })).toEqual({
        opacity: '0.5',
      });
      expect(resolveExtend(extend, { disabled: false })).toEqual({
        opacity: '1',
      });
    });

    test('handles function returning empty string', () => {
      const result = resolveExtend(() => '', {});
      expect(result).toBeUndefined();
    });
  });

  describe('array extend', () => {
    test('joins array of strings', () => {
      const result = resolveExtend(['color: red;', 'font-size: 16px;'], {});
      expect(result).toEqual({ color: 'red', fontSize: '16px' });
    });

    test('executes function items in array', () => {
      const extend = [
        'color: red;',
        (props) => (props.bold ? 'font-weight: bold;' : ''),
      ];
      const result = resolveExtend(extend, { bold: true });
      expect(result).toEqual({ color: 'red', fontWeight: 'bold' });
    });

    test('handles array with mixed functions and strings', () => {
      const extend = [
        'color: blue;',
        (props) => `font-size: ${props.size}px;`,
        'text-align: center;',
      ];
      const result = resolveExtend(extend, { size: 18 });
      expect(result).toEqual({
        color: 'blue',
        fontSize: '18px',
        textAlign: 'center',
      });
    });
  });

  describe('falsy input', () => {
    test('returns undefined for null', () => {
      expect(resolveExtend(null, {})).toBeUndefined();
    });

    test('returns undefined for undefined', () => {
      expect(resolveExtend(undefined, {})).toBeUndefined();
    });

    test('returns undefined for false', () => {
      expect(resolveExtend(false, {})).toBeUndefined();
    });

    test('does not throw on falsy values', () => {
      expect(() => {
        resolveExtend(null, {});
        resolveExtend(undefined, {});
        resolveExtend(false, {});
      }).not.toThrow();
    });
  });

  describe('console warnings (dev mode)', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    test('warns for pseudo-selector', () => {
      const extend = 'color: red; &:hover { color: blue; }';
      resolveExtend(extend, {});
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('pseudo-selectors'),
      );
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('cannot be applied via the style prop'),
      );
    });

    test('warns for @-rules', () => {
      const extend = '@media (max-width: 600px) { color: red; }';
      resolveExtend(extend, {});
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('@-rules'),
      );
    });

    test('detects both pseudo-selectors and @-rules', () => {
      const extend =
        // eslint-disable-next-line max-len
        'color: red; &:hover { color: blue; } @media (max-width: 600px) { font-size: 12px; }';
      resolveExtend(extend, {});
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('pseudo-selectors and @-rules'),
      );
    });

    test('warns generically for valid style prop content', () => {
      const extend = 'color: red; font-weight: bold;';
      resolveExtend(extend, {});
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('deprecated'),
      );
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Use the className prop'),
      );
    });

    test('uses specific extend path when provided', () => {
      const extend = 'color: red; font-weight: bold;';
      resolveExtend(extend, {}, 'theme.text.extend');
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('theme.text.extend is deprecated'),
      );
    });

    test('uses specific extend path for dropped pseudo selectors', () => {
      const extend = 'color: red; &:hover { color: blue; }';
      resolveExtend(extend, {}, 'theme.anchor.extend');
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          'theme.anchor.extend contains pseudo-selectors',
        ),
      );
    });

    test('does not warn in production', () => {
      process.env.NODE_ENV = 'production';
      const extend = 'color: red;';
      resolveExtend(extend, {});
      expect(console.warn).not.toHaveBeenCalled();
    });
  });
});
