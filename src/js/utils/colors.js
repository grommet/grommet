const colorNameToHex = (color) => {
  const colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
  };
  if (color && typeof colors[color.toLowerCase()] !== 'undefined') {
    return colors[color.toLowerCase()];
  }
  return false;
};

// Returns the specific color that should be used according to the theme.
// If 'dark' is supplied, it takes precedence over 'theme.dark'.
// Can return undefined.
export const normalizeColor = (color, theme, dark) => {
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

const canExtractRGBArray = (color) =>
  hexExp.test(color) ||
  rgbExp.test(color) ||
  rgbaExp.test(color) ||
  hslExp.test(color);

const getRGBArray = (color) => {
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

export const colorIsDark = (color) => {
  if (color && canExtractRGBArray(color)) {
    const [red, green, blue, alpha] = getRGBArray(color);
    // if there is an alpha and it's greater than 50%, we can't really tell
    if (alpha < 0.5) return undefined;
    const brightness = (299 * red + 587 * green + 114 * blue) / 1000;
    // From: http://www.had2know.com/technology/color-contrast-calculator-web-design.html
    // Above domain is no longer registered.
    return brightness < 125;
  }
  return undefined;
};

export const getRGBA = (color, opacity) => {
  const hexColor = colorNameToHex(color) ? colorNameToHex(color) : color;
  if (hexColor && canExtractRGBArray(hexColor)) {
    const [red, green, blue, alpha] = getRGBArray(hexColor);
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
