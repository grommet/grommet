import { css } from 'styled-components';

import {
  colorIsDark,
  getRGBA,
  normalizeColor,
  canExtractRGBArray,
  getRGBArray,
} from './colors';

// evalStyle() converts a styled-components item into a string
const evalStyle = (arg, theme) => {
  if (arg && Array.isArray(arg) && typeof arg[0] === 'function') {
    return arg[0]({ theme });
  }
  return arg;
};

export const normalizeBackground = (backgroundArg, theme) => {
  const background = theme.global.backgrounds?.[backgroundArg] || backgroundArg;
  let result = background;
  // If the background has a light or dark object, use that
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

const normalizeBackgroundColor = (backgroundArg, theme) => {
  const background = backgroundArg.color || backgroundArg;
  const result = normalizeColor(
    // Background color may be defined by theme.global.backgrounds or
    // theme.global.colors.
    theme.global.backgrounds?.[background] || background,
    theme,
    backgroundArg.dark,
  );
  return result;
};

const normalizeBackgroundImage = (background, theme) => {
  let result;
  if (background.image) {
    result =
      normalizeBackground(
        background.dark
          ? theme.global.backgrounds?.[background.image]?.dark
          : theme.global.backgrounds?.[background.image],
        theme,
      ) || background.image;
  } else {
    const normalized = normalizeBackground(
      theme.global.backgrounds?.[background],
      theme,
    );
    result =
      typeof normalized === 'object'
        ? normalizeBackgroundImage(normalized, theme)
        : normalized;
  }
  return result;
};

const rotateBackground = (background, theme) => {
  const backgroundImage = normalizeBackgroundImage(background, theme);
  let result = backgroundImage;

  if (backgroundImage.lastIndexOf('linear-gradient', 0) === 0) {
    const regex = /\d{1,}deg\b,/gm; // Contains rotation specified in degrees. Only targets 'deg' string with a trailing comma. Do not match 'deg' string for hsl, etc..
    result =
      backgroundImage.lastIndexOf('deg,') >= 0
        ? backgroundImage.replace(regex, `${background.rotate}deg,`)
        : backgroundImage.replace(
            'linear-gradient(',
            `linear-gradient(${background.rotate}deg, `,
          );
  } else {
    console.warn(
      // eslint-disable-next-line max-len
      `'background.rotate' property only supports 'background.image' containing a linear-gradient string.`,
    );
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

const darkContext = (backgroundColor) => {
  const isDark = colorIsDark(backgroundColor);
  if (isDark === undefined) return undefined;
  return isDark ? 'dark' : 'light';
};

// Returns an array of two CSS colors: [background, color]
// Either could be undefined.
// background could be a CSS gradient, like "linear-gradient(...)"
export const backgroundAndTextColors = (backgroundArg, textArg, theme) => {
  if (!backgroundArg) return [undefined, textArg];

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
      const color = normalizeBackgroundColor(background, theme);
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
    backgroundColor = normalizeBackgroundColor(background, theme);
    const shade = darkContext(backgroundColor, theme);
    let transparent;

    if (backgroundColor && canExtractRGBArray(backgroundColor)) {
      const colorArray = getRGBArray(backgroundColor);
      // check if the alpha value is less than 0.5
      if (colorArray[3] < 0.5) transparent = true;
    }
    if (shade) {
      textColor = normalizeColor(text[shade] || text, theme, shade === 'dark');
    } else if (transparent && text) {
      textColor = normalizeColor(text, theme);
    } else {
      // If we can't determine the shade, we assume this isn't a simple color.
      // It could be a gradient. backgroundStyle() will take care of that case.
      if (backgroundColor !== 'transparent') backgroundColor = undefined;
      if (text) textColor = normalizeColor(text, theme);
    }
  }
  // if textArg is false, we don't want the textColor, used for Button hover
  if (textArg === false) textColor = undefined;

  return [backgroundColor, textColor];
};

export const backgroundStyle = (backgroundArg, theme, textColorArg) => {
  // for Grommet component, if the background isn't defined, don't set it
  if (backgroundArg === undefined) return undefined;

  const background = normalizeBackground(backgroundArg, theme);

  const [backgroundColor, textColor] = backgroundAndTextColors(
    background,
    textColorArg,
    theme,
  );

  const backgroundImage = background.rotate
    ? rotateBackground(background, theme)
    : normalizeBackgroundImage(background, theme);

  let backgroundClipStyle = '';
  if (background.clip) {
    backgroundClipStyle =
      background.clip === 'text'
        ? `-webkit-text-fill-color: transparent; 
           -webkit-background-clip: text; 
           background-clip: text;`
        : `background-clip: ${background.clip};`;
  }

  if (
    typeof background === 'string' &&
    background.lastIndexOf('url', 0) === 0
  ) {
    return css`
      background: ${background} no-repeat center center;
      background-size: cover;
    `;
  }

  if (backgroundImage) {
    const backgroundStyles = `
      ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
      background-image: ${backgroundImage};
      background-repeat: ${
        (typeof background === 'object' && background.repeat) || 'no-repeat'
      };
      background-position: ${background.position || 'center center'};
      background-size: ${background.size || 'cover'};
      ${backgroundClipStyle}
    `;

    // allow both background color and image, in case the image doesn't fill
    // when image and opacity are used together, we need to use pseudo :before
    // to ensure that only image and background color are affected by opacity
    // but not the container contents
    return css`
      ${textColor ? `color: ${textColor};` : ''}
      ${!background.opacity
        ? backgroundStyles
        : `position: relative;
        z-index: 0;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: -1;
          border-radius: inherit;
          ${backgroundStyles}
          opacity: ${
            background.opacity === true
              ? theme.global.opacity.medium
              : theme.global.opacity[background.opacity] || background.opacity
          };
        }`}
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
    // or theme colors that use CSS names like 'crimson' that we don't parse
    return css`
      background: ${normalizeColor(background, theme)};
    `;

  return undefined;
};

export const activeStyle = css`
  ${(props) =>
    backgroundStyle(
      normalizeColor(props.theme.global.active.background, props.theme),
      props.theme,
      props.theme.global.active.color,
    )}
`;

export const selectedStyle = css`
  ${(props) =>
    backgroundStyle(
      normalizeColor(props.theme.global.selected.background, props.theme),
      props.theme,
      props.theme.global.selected.color,
    )}
`;

export const getHoverIndicatorStyle = (hoverIndicator, theme) => {
  let background;
  let elevation;
  if (hoverIndicator === true || hoverIndicator === 'background') {
    ({ background } = theme.global.hover);
  } else if (typeof hoverIndicator === 'object') {
    if (hoverIndicator.elevation || hoverIndicator.background)
      ({ elevation, background } = hoverIndicator);
    else background = hoverIndicator;
  } else {
    background = hoverIndicator;
  }
  return css`
    ${backgroundStyle(background, theme, theme.global.hover.color)}
    ${elevation &&
    `box-shadow: ${
      theme.global.elevation[theme.dark ? 'dark' : 'light'][elevation]
    };`}
  `;
};
