
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

export const colorIsDark = (color) => {
  // https://stackoverflow.com/a/42429333
  const [red, green, blue] = color.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
  // http://www.had2know.com/technology/
  //  color-contrast-calculator-web-design.html
  const brightness = (
    (299 * red) + (587 * green) + (114 * blue)
  ) / 1000;
  return (brightness < 125);
};

export default { colorForName, colorIsDark };
