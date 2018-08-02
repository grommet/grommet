
export const colorForName = (name, theme) => {
  let color = theme.global.colors[name];
  if (color) {
    return color;
  }
  const [kind, index] = name.split('-');
  const colorSet = theme.global.colors[kind];
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

export const backgroundIsDark = (background, theme) => {
  let dark;
  if (background) {
    if (typeof background === 'object') {
      if (background.dark !== undefined) {
        dark = background.dark;
      } else if (background.color &&
        // weak opacity means we keep the existing darkness
        (!background.opacity || background.opacity !== 'weak')) {
        const color = colorForName(background.color, theme);
        if (color) {
          dark = colorIsDark(color);
        }
      }
    } else {
      const color = colorForName(background, theme);
      if (color) {
        dark = colorIsDark(color);
      }
    }
  }
  return dark;
};

export default { backgroundIsDark, colorForName, colorIsDark, getRGBA };
