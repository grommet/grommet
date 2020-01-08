import { colorIsDark, getRGBA } from '..';

describe('colorIsDark', () => {
  test('#666666', () => {
    const dark = colorIsDark('#666666');
    expect(dark).toBe(true);
  });

  test('#66666699', () => {
    const dark = colorIsDark('#66666699');
    expect(dark).toBe(true);
  });

  test('#666', () => {
    const dark = colorIsDark('#666');
    expect(dark).toBe(true);
  });

  test('rgba(102, 102, 102)', () => {
    const dark = colorIsDark('rgba(102, 102, 102)');
    expect(dark).toBe(true);
  });

  test('rgba(102, 102, 102, 0.5)', () => {
    const dark = colorIsDark('rgba(102, 102, 102, 0.5)');
    expect(dark).toBe(true);
  });

  test('#999999', () => {
    const dark = colorIsDark('#999999');
    expect(dark).toBe(false);
  });

  test('#99999999', () => {
    const dark = colorIsDark('#99999999');
    expect(dark).toBe(false);
  });

  test('#999', () => {
    const dark = colorIsDark('#999');
    expect(dark).toBe(false);
  });

  test('rgba(153, 153, 153)', () => {
    const dark = colorIsDark('rgba(153, 153, 153)');
    expect(dark).toBe(false);
  });

  test('rgba(153, 153, 153, 0.5)', () => {
    const dark = colorIsDark('rgba(153, 153, 153, 0.5)');
    expect(dark).toBe(false);
  });

  test('#FFFFFF11', () => {
    const dark = colorIsDark('#FFFFFF11');
    expect(dark).toBe(undefined);
  });

  test('#FFF1', () => {
    const dark = colorIsDark('#FFF1');
    expect(dark).toBe(undefined);
  });

  test('#11111111', () => {
    const dark = colorIsDark('#11111111');
    expect(dark).toBe(undefined);
  });

  test('rgba(102, 102, 102, 0.4)', () => {
    const dark = colorIsDark('rgba(102, 102, 102, 0.4)');
    expect(dark).toBe(undefined);
  });
});

describe('getRGBA', () => {
  test('#666666', () => {
    const rgba = getRGBA('#666666');
    expect(rgba).toBe('rgba(102, 102, 102, 1)');
  });

  test('#66666699', () => {
    const rgba = getRGBA('#66666699');
    expect(rgba).toBe('rgba(102, 102, 102, 0.6)');
  });

  test('#666666 0.4', () => {
    const rgba = getRGBA('#666666', 0.4);
    expect(rgba).toBe('rgba(102, 102, 102, 0.4)');
  });
});
