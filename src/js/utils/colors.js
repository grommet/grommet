
export const colorForName = (name, theme) =>
  theme.global.colors[name] || name;

function parseHexToRGB(color) {
  // https://stackoverflow.com/a/42429333
  return color.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
}

const canExtractRGBArray = color => /^#/.test(color) || /^rgb/.test(color);

function getRGBArray(color) {
  if (/^#/.test(color)) {
    return parseHexToRGB(color);
  } else if (/^rgb/.test(color)) {
    return color.match(/rgba?\((\s?[0-9]*\s?),(\s?[0-9]*\s?),(\s?[0-9]*\s?).*?\)/).splice(1);
  }
  return color;
}

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

export const normalizeColor = (color, theme) => {
  // If the color has a light or dark object, use that
  let result = color;
  if (color) {
    if (theme.dark && color.dark) {
      result = color.dark;
    } else if (!theme.dark && color.light) {
      result = color.light;
    }
  }
  return result;
};

export default { colorForName, colorIsDark, getRGBA, normalizeColor };
