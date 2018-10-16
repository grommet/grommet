
export const normalizeColor = (color, theme, required) => {
  const colorSpec = theme.global.colors[color] || color;
  // If the color has a light or dark object, use that
  let result = colorSpec;
  if (colorSpec) {
    if (theme.dark && colorSpec.dark) {
      result = colorSpec.dark;
    } else if (!theme.dark && colorSpec.light) {
      result = colorSpec.light;
    }
  }
  // allow one level of indirection in color names
  if (result && theme.global.colors[result]) {
    result = normalizeColor(result, theme);
  }
  return (required && result === color) ? 'inherit' : result;
};

const parseHexToRGB = color => (
  // https://stackoverflow.com/a/42429333
  color.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16)));

const canExtractRGBArray = color => /^#/.test(color) || /^rgb/.test(color);

const getRGBArray = (color) => {
  if (/^#/.test(color)) {
    return parseHexToRGB(color);
  }
  if (/^rgb/.test(color)) {
    return color.match(/rgba?\((\s?[0-9]*\s?),(\s?[0-9]*\s?),(\s?[0-9]*\s?).*?\)/).splice(1);
  }
  return color;
};

export const colorIsDark = (color) => {
  const [red, green, blue] = getRGBArray(color);
  // http://www.had2know.com/technology/
  //  color-contrast-calculator-web-design.html
  const brightness = (
    (299 * red) + (587 * green) + (114 * blue)
  ) / 1000;
  return (brightness < 125);
};

export const getRGBA = (color, opacity) => {
  if (color && canExtractRGBArray(color)) {
    const [red, green, blue] = getRGBArray(color);
    return `rgba(${red}, ${green}, ${blue}, ${opacity || 1})`;
  }
  return undefined;
};
