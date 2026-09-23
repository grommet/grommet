// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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

  test('#000000', () => {
    const dark = colorIsDark('#000000');
    expect(dark).toBe(true);
  });

  test('#FFFFFF', () => {
    const dark = colorIsDark('#FFFFFF');
    expect(dark).toBe(false);
  });

  // https://github.com/grommet/grommet/issues/8151
  // WCAG relative luminance classifies this as light, unlike the legacy
  // perceived-brightness formula which incorrectly classified it as dark.
  test('#00a4b3', () => {
    const dark = colorIsDark('#00a4b3');
    expect(dark).toBe(false);
  });

  // without a theme, the threshold assumes black/white text and classifies
  // #777777 as light (luminance ~0.1845 is above the black/white threshold
  // ~0.179).
  test('#777777 without theme', () => {
    const dark = colorIsDark('#777777');
    expect(dark).toBe(false);
  });

  // base theme's actual text colors (#f8f8f8 / #444444) are less extreme
  // than pure white/black, so the equal-contrast threshold is higher
  // (~0.277) and #777777 (luminance ~0.1845) is correctly classified dark,
  // selecting the higher-contrast text.dark (#f8f8f8) foreground.
  test('#777777 with theme text colors', () => {
    const theme = {
      global: { colors: { text: { dark: '#f8f8f8', light: '#444444' } } },
    };
    const dark = colorIsDark('#777777', theme);
    expect(dark).toBe(true);
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
