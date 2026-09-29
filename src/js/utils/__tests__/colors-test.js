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

  // when a caller (e.g. Button with an explicit color prop) will select
  // from an alternate text pair rather than the theme's global text colors,
  // that pair must drive the threshold, or the classification can pick the
  // pair with lower contrast (here: black/white instead of the default
  // #f8f8f8/#444444, which raises the threshold above #777777's luminance).
  test('#777777 with explicit text pair overriding theme text colors', () => {
    const theme = {
      global: { colors: { text: { dark: '#f8f8f8', light: '#444444' } } },
    };
    const explicitText = { dark: '#FFFFFF', light: '#000000' };
    const dark = colorIsDark('#777777', theme, explicitText);
    expect(dark).toBe(false);
  });

  // theme.global.colors.text.light/.dark can be aliases to a shared
  // { dark, light } color (e.g. 'text-strong'). Resolving those aliases
  // must pick the intended semantic side (light-mode vs dark-mode text),
  // not the theme's current mode, or the threshold collapses to 0 and
  // every normal background is reported as light.
  test('#666666 with theme text color aliases on a light theme', () => {
    const theme = {
      dark: false,
      global: {
        colors: {
          text: { dark: 'text-strong', light: 'text-strong' },
          'text-strong': { dark: '#FFFFFF', light: '#000000' },
        },
      },
    };
    const dark = colorIsDark('#666666', theme);
    expect(dark).toBe(true);
  });

  // backgroundAndTextColors passes a named theme color string (e.g. 'text')
  // as the text pair, which itself must be resolved against theme colors
  // rather than accessed as a { dark, light } object directly, or the
  // threshold silently falls back to the black/white default.
  test('#777777 with a named theme color string as the text pair', () => {
    const theme = {
      global: {
        colors: {
          text: { dark: '#f8f8f8', light: '#444444' },
        },
      },
    };
    const dark = colorIsDark('#777777', theme, 'text');
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
