"use strict";

exports.__esModule = true;
exports.normalizeColor = exports.getRGBArray = exports.getRGBA = exports.colorIsDark = exports.canExtractRGBArray = void 0;
var _legacyColorIsDark = require("./legacyColorIsDark");
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Track which deprecated colors have already been warned about
var warnedColors = new Set();
var checkColorDeprecation = function checkColorDeprecation(color, theme, dark) {
  var _theme$global$depreca;
  if ((_theme$global$depreca = theme.global.deprecated) != null && _theme$global$depreca.colors && process.env.NODE_ENV !== 'production') {
    var colorKey = color;
    if (typeof color === 'object') {
      if (dark === true || dark === undefined && theme.dark) colorKey = color.dark;else colorKey = color.light;
    }
    if (!warnedColors.has(colorKey)) {
      var deprecatedColor;
      if (typeof color === 'string') {
        deprecatedColor = theme.global.deprecated.colors.find(function (item) {
          return item.name === color;
        });
      } else if (typeof color === 'object') {
        deprecatedColor = theme.global.deprecated.colors.find(function (item) {
          return item.name === color.light || item.name === color.dark;
        });
      }
      if (deprecatedColor) {
        warnedColors.add(colorKey);
        console.warn(deprecatedColor.message || colorKey + " is deprecated.");
      }
    }
  }
};

// Returns the specific color that should be used according to the theme.
// If 'dark' is supplied, it takes precedence over 'theme.dark'.
// Can return undefined.
var _normalizeColor = exports.normalizeColor = function normalizeColor(color, theme, dark) {
  checkColorDeprecation(color, theme, dark);
  var colorSpec = theme.global && theme.global.colors[color] !== undefined ? theme.global.colors[color] : color;
  // If the color has a light or dark object, use that
  var result = colorSpec;
  if (colorSpec) {
    if ((dark === true || dark === undefined && theme.dark) && colorSpec.dark !== undefined) {
      result = colorSpec.dark;
    } else if ((dark === false || !theme.dark) && colorSpec.light !== undefined) {
      result = colorSpec.light;
    }
  }
  // allow one level of indirection in color names
  if (result && theme.global && theme.global.colors[result] !== undefined) {
    result = _normalizeColor(result, theme, dark);
  }
  return result;
};
var parseHexToRGB = function parseHexToRGB(color) {
  return color.length < 7 // 7 is what's needed for '#RRGGBB'
  ? color.match(/[A-Za-z0-9]{1}/g).map(function (v) {
    return parseInt("" + v + v, 16);
  }) :
  // https://stackoverflow.com/a/42429333
  color.match(/[A-Za-z0-9]{2}/g).map(function (v) {
    return parseInt(v, 16);
  });
};

// From: https://stackoverflow.com/a/9493060/8513067
// Converts an HSL color value to RGB. Conversion formula
// adapted from http://en.wikipedia.org/wiki/HSL_color_space.
// Assumes h, s, and l are contained in the set [0, 1] and
// returns r, g, and b in the set [0, 255].
var hslToRGB = function hslToRGB(h, s, l) {
  var r;
  var g;
  var b;
  if (s === 0 || s === '0') {
    // achromatic
    r = l;
    g = l;
    b = l;
  } else {
    var hue2rgb = function hue2rgb(p, q, inT) {
      var t = inT;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 0.16666667) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 0.66666667) return p + (q - p) * (0.66666667 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 0.33333333);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 0.33333333);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// allow for alpha: #RGB, #RGBA, #RRGGBB, or #RRGGBBAA
var hexExp = /^#[A-Za-z0-9]{3,4}$|^#[A-Za-z0-9]{6,8}$/;
var rgbExp = /^rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?\)/;
var rgbaExp = /^rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([.0-9]*)\s?\)/;
// e.g. hsl(240, 60%, 50%)
var hslExp = /^hsla?\(\s?([0-9]*)\s?,\s?([0-9]*)%?\s?,\s?([0-9]*)%?\s?.*?\)/;
var canExtractRGBArray = exports.canExtractRGBArray = function canExtractRGBArray(color) {
  return hexExp.test(color) || rgbExp.test(color) || rgbaExp.test(color) || hslExp.test(color);
};
var getRGBArray = exports.getRGBArray = function getRGBArray(color) {
  if (hexExp.test(color)) {
    var _parseHexToRGB = parseHexToRGB(color),
      red = _parseHexToRGB[0],
      green = _parseHexToRGB[1],
      blue = _parseHexToRGB[2],
      alpha = _parseHexToRGB[3];
    return [red, green, blue, alpha !== undefined ? alpha / 255.0 : undefined];
  }
  var match = color.match(rgbExp);
  if (match) {
    return match.splice(1).map(function (v) {
      return parseInt(v, 10);
    });
  }
  match = color.match(rgbaExp);
  if (match) {
    return match.splice(1).map(function (v) {
      return parseFloat(v, 10);
    });
  }
  match = color.match(hslExp);
  if (match) {
    var _match$splice$map = match.splice(1).map(function (v) {
        return parseInt(v, 10);
      }),
      h = _match$splice$map[0],
      s = _match$splice$map[1],
      l = _match$splice$map[2];
    return hslToRGB(h / 360.0, s / 100.0, l / 100.0);
  }
  return color;
};

// sRGB-to-linear conversion constants.
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
var SRGB_LINEAR_THRESHOLD = 0.04045;
var SRGB_LINEAR_DIVISOR = 12.92;
var SRGB_GAMMA_OFFSET = 0.055;
var SRGB_GAMMA_DIVISOR = 1.055;
var SRGB_GAMMA_EXPONENT = 2.4;

// Linearizes an sRGB channel (0-255) per the WCAG relative luminance spec.
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
var linearizeChannel = function linearizeChannel(value) {
  var c = value / 255;
  return c <= SRGB_LINEAR_THRESHOLD ? c / SRGB_LINEAR_DIVISOR : Math.pow((c + SRGB_GAMMA_OFFSET) / SRGB_GAMMA_DIVISOR, SRGB_GAMMA_EXPONENT);
};

// WCAG relative luminance coefficients for linearized sRGB channels.
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
var RED_LUMINANCE_COEFFICIENT = 0.2126;
var GREEN_LUMINANCE_COEFFICIENT = 0.7152;
var BLUE_LUMINANCE_COEFFICIENT = 0.0722;
var relativeLuminance = function relativeLuminance(red, green, blue) {
  return RED_LUMINANCE_COEFFICIENT * linearizeChannel(red) + GREEN_LUMINANCE_COEFFICIENT * linearizeChannel(green) + BLUE_LUMINANCE_COEFFICIENT * linearizeChannel(blue);
};

// Offset added to luminance values in the WCAG contrast ratio formula:
// (L1 + 0.05) / (L2 + 0.05). https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
var WCAG_CONTRAST_OFFSET = 0.05;

// Luminance at which black and white text have equal WCAG contrast ratios
// against the background: solving (1.05 / (L+0.05)) = ((L+0.05) / 0.05).
var EQUAL_CONTRAST_LUMINANCE = 0.179;
var luminanceOf = function luminanceOf(color, theme, dark) {
  var resolved = theme && _normalizeColor(color, theme, dark) || color;
  if (resolved && canExtractRGBArray(resolved)) {
    var _getRGBArray = getRGBArray(resolved),
      red = _getRGBArray[0],
      green = _getRGBArray[1],
      blue = _getRGBArray[2];
    return relativeLuminance(red, green, blue);
  }
  return undefined;
};

// Luminance at which a pair of light/dark text colors have equal WCAG
// contrast against the background. text.light is the (typically darker)
// text used against light backgrounds and text.dark is the (typically
// lighter) text used against dark backgrounds. text defaults to
// theme.global.colors.text so callers that select an alternate text color
// pair (e.g. Button's explicit color prop) can pass it in and get a
// threshold that matches what will actually be selected. Falls back to the
// black/white derived EQUAL_CONTRAST_LUMINANCE when no usable text colors
// are available, preserving prior behavior for callers that don't pass one.
var equalContrastLuminance = function equalContrastLuminance(theme, text) {
  if (text === void 0) {
    var _theme$global;
    text = theme == null || (_theme$global = theme.global) == null || (_theme$global = _theme$global.colors) == null ? void 0 : _theme$global.text;
  }
  if (!text) return EQUAL_CONTRAST_LUMINANCE;
  // resolve both sides directly from text (a color name, a raw color, or a
  // { dark, light } pair) with explicit dark args, so named theme colors
  // (e.g. 'text') and aliases (e.g. text.dark: 'text-strong') resolve to
  // the intended side rather than the theme's current mode
  var darkTextLuminance = luminanceOf(text, theme, false);
  var lightTextLuminance = luminanceOf(text, theme, true);
  if (darkTextLuminance === undefined || lightTextLuminance === undefined) {
    return EQUAL_CONTRAST_LUMINANCE;
  }
  return Math.sqrt((darkTextLuminance + WCAG_CONTRAST_OFFSET) * (lightTextLuminance + WCAG_CONTRAST_OFFSET)) - WCAG_CONTRAST_OFFSET;
};
var colorIsDark = exports.colorIsDark = function colorIsDark(color, theme, text) {
  if (color && canExtractRGBArray(color)) {
    var _getRGBArray2 = getRGBArray(color),
      red = _getRGBArray2[0],
      green = _getRGBArray2[1],
      blue = _getRGBArray2[2],
      alpha = _getRGBArray2[3];
    // if there is an alpha and it's greater than 50%, we can't really tell
    if (alpha < 0.5) return undefined;
    if (theme != null && theme[_legacyColorIsDark.LEGACY_COLOR_IS_DARK]) {
      return (0, _legacyColorIsDark.legacyColorIsDark)(red, green, blue);
    }
    return relativeLuminance(red, green, blue) < equalContrastLuminance(theme, text);
  }
  return undefined;
};
var getRGBA = exports.getRGBA = function getRGBA(color, opacity) {
  if (color && canExtractRGBArray(color)) {
    var _getRGBArray3 = getRGBArray(color),
      red = _getRGBArray3[0],
      green = _getRGBArray3[1],
      blue = _getRGBArray3[2],
      alpha = _getRGBArray3[3];
    var normalizedAlpha;
    if (opacity !== undefined) {
      normalizedAlpha = opacity;
    } else if (alpha !== undefined) {
      normalizedAlpha = alpha;
    } else {
      normalizedAlpha = 1;
    }
    return "rgba(" + red + ", " + green + ", " + blue + ", " + normalizedAlpha + ")";
  }
  return undefined;
};