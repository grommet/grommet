import { css } from 'styled-components';

import { colorIsDark, getRGBA, normalizeColor } from './colors';

// evalStyle() converts a styled-components item into a string
const evalStyle = (arg, theme) => {
  if (arg && Array.isArray(arg) && typeof arg[0] === 'function') {
    return arg[0]({ theme });
  }
  return arg;
};

export const normalizeBackground = (background, theme) => {
  // If the background has a light or dark object, use that
  let result = background;
  if (background) {
    if (theme.dark && background.dark && typeof background.dark !== 'boolean') {
      result = background.dark;
    } else if (
      !theme.dark &&
      background.light &&
      typeof background.light !== 'boolean'
    ) {
      result = background.light;
    }
    result = evalStyle(result, theme);
  }
  return result;
};

export const backgroundIsDark = (backgroundArg, theme) => {
  const background = normalizeBackground(backgroundArg, theme);
  let result;
  if (background) {
    if (typeof background === 'object') {
      const { color, dark, opacity } = background;
      if (typeof dark === 'boolean') {
        result = dark;
      } else if (
        color &&
        // weak opacity means we keep the existing darkness
        (!opacity || opacity !== 'weak')
      ) {
        const backgroundColor = normalizeColor(background.color, theme);
        if (backgroundColor) {
          result = colorIsDark(backgroundColor);
        }
      }
    } else {
      const color = normalizeColor(background, theme);
      if (color) {
        result = colorIsDark(color);
      }
    }
  }
  return result;
};

const darkContext = backgroundColor => {
  const isDark = colorIsDark(backgroundColor);
  if (isDark === undefined) return undefined;
  return isDark ? 'dark' : 'light';
};

// Returns an array of two CSS colors: [background, color]
// Either could be undefined.
// background could be a CSS gradient, like "linear-gradient(...)"
export const backgroundAndTextColors = (backgroundArg, textArg, theme) => {
  if (!backgroundArg) return [];

  const { global } = theme;
  const background = normalizeBackground(backgroundArg, theme);
  const text = textArg || global.colors.text;

  let backgroundColor;
  let textColor;
  if (typeof background === 'object') {
    if (background.dark === false) {
      textColor = text.light || text;
    } else if (background.dark) {
      textColor = text.dark || text;
    }

    if (background.color) {
      const color = normalizeColor(background.color, theme, background.dark);
      const opacity =
        background.opacity === true
          ? global.opacity.medium
          : global.opacity[background.opacity] || background.opacity;
      backgroundColor = getRGBA(color, opacity) || color;

      // If we don't have a textColor already, and we aren't too translucent,
      // set the textColor to have the best contrast against the background
      // color.
      if (!textColor && (opacity === undefined || opacity > 0.3)) {
        const shade = darkContext(backgroundColor, theme);
        textColor = normalizeColor((shade && text[shade]) || text, theme);
      }
    }
  } else {
    backgroundColor = normalizeColor(background, theme);
    const shade = darkContext(backgroundColor, theme);
    if (shade) {
      textColor = normalizeColor(text[shade] || text, theme);
    } else {
      // If we can't determine the shade, we assume this isn't a simple color.
      // It could be a gradient. backgroundStyle() will take care of that case.
      backgroundColor = undefined;
    }
  }

  return [backgroundColor, textColor];
};

export const backgroundStyle = (backgroundArg, theme, textColorArg) => {
  // for Grommet component, if the background isn't defined, don't set it
  if (backgroundArg === undefined) return undefined;

  const background = normalizeBackground(backgroundArg, theme);

  if (
    typeof background === 'string' &&
    background.lastIndexOf('url', 0) === 0
  ) {
    return css`
      background: ${background} no-repeat center center;
      background-size: cover;
    `;
  }

  const [backgroundColor, textColor] = backgroundAndTextColors(
    background,
    textColorArg,
    theme,
  );

  if (background.image) {
    // allow both background color and image, in case the image doesn't fill
    return css`
      background-image: ${background.image};
      background-repeat: ${background.repeat || 'no-repeat'};
      background-position: ${background.position || 'center center'};
      background-size: ${background.size || 'cover'};
      ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
      ${textColor ? `color: ${textColor};` : ''}
    `;
  }

  if (backgroundColor) {
    return css`
      background-color: ${backgroundColor};
      ${textColor ? `color: ${textColor};` : ''}
    `;
  }

  if (typeof background === 'string')
    // This case takes care of gradients
    // or theme colors that use CSS names like 'red' that we don't parse
    return css`
      background: ${normalizeColor(background, theme)};
    `;

  return undefined;
};

export const activeStyle = css`
  ${props =>
    backgroundStyle(
      normalizeColor(props.theme.global.active.background, props.theme),
      props.theme,
      props.theme.global.active.color,
    )}
`;

export const selectedStyle = css`
  ${props =>
    backgroundStyle(
      normalizeColor(props.theme.global.selected.background, props.theme),
      props.theme,
      props.theme.global.selected.color,
    )}
`;

export const getHoverIndicatorStyle = (hoverIndicator, theme) => {
  let background;
  if (hoverIndicator === true || hoverIndicator === 'background') {
    ({ background } = theme.global.hover);
  } else {
    background = hoverIndicator;
  }
  return css`
    ${backgroundStyle(background, theme, theme.global.hover.color)}
  `;
};
