
export const colorForName = (name, theme) => {
  const [kind, index] = name.split('-');
  const colorSet = theme.global.colors[kind];
  let color;
  if (Array.isArray(colorSet)) {
    color = colorSet[index - 1];
  } else if (typeof colorSet === 'object') {
    color = colorSet[index];
  } else if (typeof colorSet === 'string') {
    color = colorSet;
  } else {
    color = name;
  }
  return color;
};

function parseHexToRGB(color) {
  // https://stackoverflow.com/a/42429333
  return color.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
}

function getRGBArray(color) {
  if (color.startsWith('#')) {
    return parseHexToRGB(color);
  } else if (color.startsWith('rgb')) {
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

export function getRGBColor(color, opacity) {
  if (color) {
    const [red, green, blue] = getRGBArray(color);
    return `rgba(${red}, ${green}, ${blue}, ${opacity || 1})`;
  }
  return undefined;
}

export default { colorForName, colorIsDark, getRGBColor };
