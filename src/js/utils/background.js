import { css } from 'styled-components';

import { colorIsDark, getRGBA, normalizeColor } from './colors';
import { evalStyle } from './styles';

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
  // If the background has a light or dark object, use that
  const background = normalizeBackground(backgroundArg, theme);
  const textColor = textColorArg || theme.global.colors.text;

  if (typeof background === 'object') {
    const styles = [];
    if (background.image) {
      let color;
      if (background.dark === false) {
        color = textColor.light;
      } else if (background.dark) {
        color = textColor.dark;
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
      const color = normalizeColor(background.color, theme);
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
          `color: ${
            textColor[
              background.dark || colorIsDark(backgroundColor) ? 'dark' : 'light'
            ]
          };`}
      `);
    }
    if (background.dark === false) {
      styles.push(css`
        color: ${textColor.light};
      `);
    } else if (background.dark) {
      styles.push(css`
        color: ${textColor.dark};
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
    const color = normalizeColor(background, theme);
    if (color) {
      return css`
        background: ${color};
        color: ${textColor[colorIsDark(color) ? 'dark' : 'light']};
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
    )}
  color: ${props =>
    normalizeColor(props.theme.global.active.color, props.theme)};
`;

export const selectedStyle = css`
  ${props =>
    backgroundStyle(
      normalizeColor(props.theme.global.selected.background, props.theme),
      props.theme,
    )}
  color: ${props =>
    normalizeColor(props.theme.global.selected.color, props.theme)};
`;
