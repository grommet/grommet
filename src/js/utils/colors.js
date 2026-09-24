// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Track which deprecated colors have already been warned about
const warnedColors = new Set();

const checkColorDeprecation = (color, theme, dark) => {
  if (
    theme.global.deprecated?.colors &&
    process.env.NODE_ENV !== 'production'
  ) {
    let colorKey = color;
    if (typeof color === 'object') {
      if (dark === true || (dark === undefined && theme.dark))
        colorKey = color.dark;
      else colorKey = color.light;
    }
    if (!warnedColors.has(colorKey)) {
      let deprecatedColor;
      if (typeof color === 'string') {
        deprecatedColor = theme.global.deprecated.colors.find(
          (item) => item.name === color,
        );
      } else if (typeof color === 'object') {
        deprecatedColor = theme.global.deprecated.colors.find(
          (item) => item.name === color.light || item.name === color.dark,
        );
      }
      if (deprecatedColor) {
        warnedColors.add(colorKey);
        console.warn(deprecatedColor.message || `${colorKey} is deprecated.`);
      }
    }
  }
};

// Returns the specific color that should be used according to the theme.
// If 'dark' is supplied, it takes precedence over 'theme.dark'.
// Can return undefined.
export const normalizeColor = (color, theme, dark) => {
  checkColorDeprecation(color, theme, dark);
  const colorSpec =
    theme.global && theme.global.colors[color] !== undefined
      ? theme.global.colors[color]
      : color;
  // If the color has a light or dark object, use that
  let result = colorSpec;
  if (colorSpec) {
    if (
      (dark === true || (dark === undefined && theme.dark)) &&
      colorSpec.dark !== undefined
    ) {
      result = colorSpec.dark;
    } else if (
      (dark === false || !theme.dark) &&
      colorSpec.light !== undefined
    ) {
      result = colorSpec.light;
    }
  }
  // allow one level of indirection in color names
  if (result && theme.global && theme.global.colors[result] !== undefined) {
    result = normalizeColor(result, theme, dark);
  }

  return result;
};

const parseHexToRGB = (color) =>
  color.length < 7 // 7 is what's needed for '#RRGGBB'
    ? color.match(/[A-Za-z0-9]{1}/g).map((v) => parseInt(`${v}${v}`, 16))
    : // https://stackoverflow.com/a/42429333
      color.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));

// From: https://stackoverflow.com/a/9493060/8513067
// Converts an HSL color value to RGB. Conversion formula
// adapted from http://en.wikipedia.org/wiki/HSL_color_space.
// Assumes h, s, and l are contained in the set [0, 1] and
// returns r, g, and b in the set [0, 255].
const hslToRGB = (h, s, l) => {
  let r;
  let g;
  let b;

  if (s === 0 || s === '0') {
    // achromatic
    r = l;
    g = l;
    b = l;
  } else {
    const hue2rgb = (p, q, inT) => {
      let t = inT;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 0.16666667) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 0.66666667) return p + (q - p) * (0.66666667 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 0.33333333);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 0.33333333);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// allow for alpha: #RGB, #RGBA, #RRGGBB, or #RRGGBBAA
const hexExp = /^#[A-Za-z0-9]{3,4}$|^#[A-Za-z0-9]{6,8}$/;
const rgbExp = /^rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?\)/;
const rgbaExp =
  /^rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([.0-9]*)\s?\)/;
// e.g. hsl(240, 60%, 50%)
const hslExp = /^hsla?\(\s?([0-9]*)\s?,\s?([0-9]*)%?\s?,\s?([0-9]*)%?\s?.*?\)/;

export const canExtractRGBArray = (color) =>
  hexExp.test(color) ||
  rgbExp.test(color) ||
  rgbaExp.test(color) ||
  hslExp.test(color);

export const getRGBArray = (color) => {
  if (hexExp.test(color)) {
    const [red, green, blue, alpha] = parseHexToRGB(color);
    return [red, green, blue, alpha !== undefined ? alpha / 255.0 : undefined];
  }
  let match = color.match(rgbExp);
  if (match) {
    return match.splice(1).map((v) => parseInt(v, 10));
  }
  match = color.match(rgbaExp);
  if (match) {
    return match.splice(1).map((v) => parseFloat(v, 10));
  }
  match = color.match(hslExp);
  if (match) {
    const [h, s, l] = match.splice(1).map((v) => parseInt(v, 10));
    return hslToRGB(h / 360.0, s / 100.0, l / 100.0);
  }
  return color;
};

// sRGB-to-linear conversion constants.
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
const SRGB_LINEAR_THRESHOLD = 0.04045;
const SRGB_LINEAR_DIVISOR = 12.92;
const SRGB_GAMMA_OFFSET = 0.055;
const SRGB_GAMMA_DIVISOR = 1.055;
const SRGB_GAMMA_EXPONENT = 2.4;

// Linearizes an sRGB channel (0-255) per the WCAG relative luminance spec.
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
const linearizeChannel = (value) => {
  const c = value / 255;
  return c <= SRGB_LINEAR_THRESHOLD
    ? c / SRGB_LINEAR_DIVISOR
    : ((c + SRGB_GAMMA_OFFSET) / SRGB_GAMMA_DIVISOR) ** SRGB_GAMMA_EXPONENT;
};

// WCAG relative luminance coefficients for linearized sRGB channels.
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
const RED_LUMINANCE_COEFFICIENT = 0.2126;
const GREEN_LUMINANCE_COEFFICIENT = 0.7152;
const BLUE_LUMINANCE_COEFFICIENT = 0.0722;

const relativeLuminance = (red, green, blue) =>
  RED_LUMINANCE_COEFFICIENT * linearizeChannel(red) +
  GREEN_LUMINANCE_COEFFICIENT * linearizeChannel(green) +
  BLUE_LUMINANCE_COEFFICIENT * linearizeChannel(blue);

// Offset added to luminance values in the WCAG contrast ratio formula:
// (L1 + 0.05) / (L2 + 0.05). https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
const WCAG_CONTRAST_OFFSET = 0.05;

// Luminance at which black and white text have equal WCAG contrast ratios
// against the background: solving (1.05 / (L+0.05)) = ((L+0.05) / 0.05).
const EQUAL_CONTRAST_LUMINANCE = 0.179;

const luminanceOf = (color, theme, dark) => {
  const resolved = (theme && normalizeColor(color, theme, dark)) || color;
  if (resolved && canExtractRGBArray(resolved)) {
    const [red, green, blue] = getRGBArray(resolved);
    return relativeLuminance(red, green, blue);
  }
  return undefined;
};

// Luminance at which the theme's actual light/dark text colors have equal
// WCAG contrast against the background. theme.global.colors.text.light is
// the (typically darker) text used against light backgrounds and
// theme.global.colors.text.dark is the (typically lighter) text used
// against dark backgrounds. Falls back to the black/white derived
// EQUAL_CONTRAST_LUMINANCE when the theme or its text colors aren't
// available, preserving prior behavior for callers that don't pass a theme.
const equalContrastLuminance = (theme) => {
  const text = theme?.global?.colors?.text;
  if (!text) return EQUAL_CONTRAST_LUMINANCE;
  // explicit dark args so alias colors (e.g. text.dark: 'text-strong')
  // resolve to the intended side rather than the theme's current mode
  const darkTextLuminance = luminanceOf(text.light, theme, false);
  const lightTextLuminance = luminanceOf(text.dark, theme, true);
  if (darkTextLuminance === undefined || lightTextLuminance === undefined) {
    return EQUAL_CONTRAST_LUMINANCE;
  }
  return (
    Math.sqrt(
      (darkTextLuminance + WCAG_CONTRAST_OFFSET) *
        (lightTextLuminance + WCAG_CONTRAST_OFFSET),
    ) - WCAG_CONTRAST_OFFSET
  );
};

export const colorIsDark = (color, theme) => {
  if (color && canExtractRGBArray(color)) {
    const [red, green, blue, alpha] = getRGBArray(color);
    // if there is an alpha and it's greater than 50%, we can't really tell
    if (alpha < 0.5) return undefined;
    return relativeLuminance(red, green, blue) < equalContrastLuminance(theme);
  }
  return undefined;
};

export const getRGBA = (color, opacity) => {
  if (color && canExtractRGBArray(color)) {
    const [red, green, blue, alpha] = getRGBArray(color);
    let normalizedAlpha;
    if (opacity !== undefined) {
      normalizedAlpha = opacity;
    } else if (alpha !== undefined) {
      normalizedAlpha = alpha;
    } else {
      normalizedAlpha = 1;
    }
    return `rgba(${red}, ${green}, ${blue}, ${normalizedAlpha})`;
  }
  return undefined;
};
