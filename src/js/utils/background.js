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

export const backgroundStyle = (backgroundArg, theme, textColorArg) => {
  // for Grommet component, if the background isn't defined, don't set it
  if (backgroundArg === undefined) {
    return undefined;
  }

  // If the background has a light or dark object, use that
  const background = normalizeBackground(backgroundArg, theme);
  const textColor = textColorArg || theme.global.colors.text;

  if (typeof background === 'object') {
    const styles = [];
    if (background.image) {
      let color;
      if (background.dark === false) {
        color = normalizeColor(textColor.light || textColor, theme);
      } else if (background.dark) {
        color = normalizeColor(textColor.dark || textColor, theme);
      } else if (!textColorArg) {
        color = 'inherit';
      }
      styles.push(css`
        background-image: ${background.image};
        background-repeat: ${background.repeat || 'no-repeat'};
        background-position: ${background.position || 'center center'};
        background-size: ${background.size || 'cover'};
        color: ${color};
      `);
    }
    if (background.color) {
      const color = normalizeColor(background.color, theme, background.dark);
      const backgroundColor =
        getRGBA(
          color,
          background.opacity === true
            ? theme.global.opacity.medium
            : theme.global.opacity[background.opacity] || background.opacity,
        ) || color;
      styles.push(css`
        background-color: ${backgroundColor};
        ${(!background.opacity || background.opacity !== 'weak') &&
          `color: ${normalizeColor(
            textColor[
              background.dark || colorIsDark(backgroundColor) ? 'dark' : 'light'
            ] || textColor,
            theme,
          )};`}
      `);
    }
    if (background.dark === false) {
      styles.push(css`
        color: ${textColor.light || textColor};
      `);
    } else if (background.dark) {
      styles.push(css`
        color: ${textColor.dark || textColor};
      `);
    }
    return styles;
  }

  if (background) {
    if (background.lastIndexOf('url', 0) === 0) {
      return css`
        background: ${background} no-repeat center center;
        background-size: cover;
      `;
    }
    const backgroundColor = normalizeColor(background, theme);
    if (backgroundColor) {
      const backgroundDark = colorIsDark(backgroundColor);
      return css`
        background: ${backgroundColor};
        color: ${normalizeColor(
          textColor[
            backgroundDark || (backgroundDark === undefined && theme.dark)
              ? 'dark'
              : 'light'
          ] || textColor,
          theme,
        )};
      `;
    }
  }

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
