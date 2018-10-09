import { css } from 'styled-components';

import { colorForName, colorIsDark, getRGBA } from './colors';
import { evalStyle } from './styles';

export const normalizeBackground = (background, theme) => {
  // If the background has a light or dark object, use that
  let result = background;
  if (background) {
    if (theme.dark && background.dark && typeof background.dark !== 'boolean') {
      result = background.dark;
    } else if (!theme.dark && background.light && typeof background.light !== 'boolean') {
      result = background.light;
    }
    result = evalStyle(result, theme);
  }
  return result;
};

export const backgroundIsDark = (backgroundArg, theme) => {
  const background = normalizeBackground(backgroundArg, theme);
  let dark;
  if (background) {
    if (typeof background === 'object') {
      if (typeof background.dark === 'boolean') {
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

export const backgroundStyle = (backgroundArg, theme) => {
  // If the background has a light or dark object, use that
  const background = normalizeBackground(backgroundArg, theme);

  if (typeof background === 'object') {
    const styles = [];
    if (background.image) {
      let color;
      if (background.dark === false) {
        color = theme.global.text.color.light;
      } else if (background.dark) {
        color = theme.global.text.color.dark;
      } else {
        color = 'inherit';
      }
      styles.push(css`
        background-image: ${background.image};
        background-repeat: no-repeat;
        background-position: ${background.position || 'center center'};
        background-size: cover;
        color: ${color};
      `);
    }
    if (background.color) {
      const color = colorForName(background.color, theme);
      const backgroundColor = getRGBA(
        color,
        background.opacity === true ? (
          theme.global.opacity.medium
        ) : (
          theme.global.opacity[background.opacity]
        )
      ) || color;
      styles.push(css`
        background: ${backgroundColor};
        ${(!background.opacity || background.opacity !== 'weak') &&
          `color: ${
            theme.global.text.color[background.dark || colorIsDark(backgroundColor) ?
              'dark' : 'light']};`
        }
      `);
    }
    if (background.dark === false) {
      styles.push(css`
        color: ${theme.global.text.color.light};
      `);
    }
    if (background.dark) {
      styles.push(css`
        color: ${theme.global.text.color.dark};
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
    const color = colorForName(background, theme);
    if (color) {
      return css`
        background: ${color};
        color: ${theme.global.text.color[colorIsDark(color) ? 'dark' : 'light']};
      `;
    }
  }

  return undefined;
};
