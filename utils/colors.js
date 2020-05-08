"use strict";

exports.__esModule = true;
exports.getRGBA = exports.colorIsDark = exports.normalizeColor = void 0;

// Returns the specific color that should be used according to the theme.
// If 'dark' is supplied, it takes precedence over 'theme.dark'.
// Can return undefined.
var normalizeColor = function normalizeColor(color, theme, dark) {
  var colorSpec = theme.global && theme.global.colors[color] !== undefined ? theme.global.colors[color] : color; // If the color has a light or dark object, use that

  var result = colorSpec;

  if (colorSpec) {
    if ((dark === true || dark === undefined && theme.dark) && colorSpec.dark !== undefined) {
      result = colorSpec.dark;
    } else if ((dark === false || !theme.dark) && colorSpec.light !== undefined) {
      result = colorSpec.light;
    }
  } // allow one level of indirection in color names


  if (result && theme.global && theme.global.colors[result] !== undefined) {
    result = normalizeColor(result, theme, dark);
  }

  return result;
};

exports.normalizeColor = normalizeColor;

var parseHexToRGB = function parseHexToRGB(color) {
  return color.length < 7 // 7 is what's needed for '#RRGGBB'
  ? color.match(/[A-Za-z0-9]{1}/g).map(function (v) {
    return parseInt("" + v + v, 16);
  }) : // https://stackoverflow.com/a/42429333
  color.match(/[A-Za-z0-9]{2}/g).map(function (v) {
    return parseInt(v, 16);
  });
}; // From: https://stackoverflow.com/a/9493060/8513067
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
}; // allow for alpha: #RGB, #RGBA, #RRGGBB, or #RRGGBBAA


var hexExp = /^#[A-Za-z0-9]{3,4}$|^#[A-Za-z0-9]{6,8}$/;
var rgbExp = /rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?\)/;
var rgbaExp = /rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([.0-9]*)\s?\)/; // e.g. hsl(240, 60%, 50%)

var hslExp = /hsla?\(\s?([0-9]*)\s?,\s?([0-9]*)%?\s?,\s?([0-9]*)%?\s?.*?\)/;

var canExtractRGBArray = function canExtractRGBArray(color) {
  return hexExp.test(color) || rgbExp.test(color) || rgbaExp.test(color) || hslExp.test(color);
};

var getRGBArray = function getRGBArray(color) {
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

var colorIsDark = function colorIsDark(color) {
  if (color && canExtractRGBArray(color)) {
    var _getRGBArray = getRGBArray(color),
        red = _getRGBArray[0],
        green = _getRGBArray[1],
        blue = _getRGBArray[2],
        alpha = _getRGBArray[3]; // if there is an alpha and it's greater than 50%, we can't really tell


    if (alpha < 0.5) return undefined;
    var brightness = (299 * red + 587 * green + 114 * blue) / 1000; // From: http://www.had2know.com/technology/color-contrast-calculator-web-design.html
    // Above domain is no longer registered.

    return brightness < 125;
  }

  return undefined;
};

exports.colorIsDark = colorIsDark;

var getRGBA = function getRGBA(color, opacity) {
  if (color && canExtractRGBArray(color)) {
    var _getRGBArray2 = getRGBArray(color),
        red = _getRGBArray2[0],
        green = _getRGBArray2[1],
        blue = _getRGBArray2[2],
        alpha = _getRGBArray2[3];

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

exports.getRGBA = getRGBA;