import { css } from 'styled-components';

import { parseMetricToNum } from './mixins';
import { colorForName, colorIsDark, getRGBA } from './colors';

export const activeStyle = css`
  background-color: ${props => props.theme.global.hover.backgroundColor};
  color: ${props => props.theme.global.hover.textColor};
`;

export const backgroundStyle = (background, theme) => {
  if (typeof background === 'object') {
    if (background.image) {
      let color;
      if (background.dark === false) {
        color = theme.global.colors.text;
      } else if (background.dark) {
        color = theme.global.colors.darkBackground.text;
      } else {
        color = 'inherit';
      }
      return css`
        background: ${background.image} no-repeat;
        background-position: ${background.position || 'center center'};
        background-size: cover;
        color: ${color};
      `;
    } else if (background.color) {
      const color = colorForName(background.color, theme);
      const rgba = getRGBA(
        color,
        background.opacity === true ? (
          theme.global.opacity.medium
        ) : (
          theme.global.opacity[background.opacity]
        )
      );
      if (rgba) {
        return css`
          background-color: ${rgba};
          color: ${
            colorIsDark(rgba) ? theme.global.colors.darkBackground.text : theme.global.colors.text
          };
        `;
      }
    } else if (background.dark === false) {
      return css`
        color: ${theme.global.colors.text};
      `;
    } else if (background.dark) {
      return css`
        color: ${theme.global.colors.darkBackground.text};
      `;
    }
    return undefined;
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
        background-color: ${color};
        color: ${colorIsDark(color) ?
          theme.global.colors.darkBackground.text : theme.global.colors.text};
      `;
    }
  }
  return undefined;
};

export const baseStyle = css`
  font-family: ${props => props.theme.global.font.family};
  font-size: ${props => `${(parseMetricToNum(props.theme.global.font.size) / 16) * 1}em`};
  line-height: ${props => (
    parseMetricToNum(props.theme.global.lineHeight) / parseMetricToNum(props.theme.global.font.size)
  )};
  ${props => props.theme.global.colors.text &&
    `color: ${props.theme.global.colors.text};`}
  ${props => props.theme.global.colors.background &&
    `background-color: ${props.theme.global.colors.background};`}

  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;

// focus also supports clickable elements inside svg
export const focusStyle = css`
  > circle,
  > ellipse,
  > line,
  > path,
  > polygon,
  > polyline,
  > rect {
    outline: ${
      props => props.theme.global.focus.border.color
    } solid 2px;
  }
  border-color: ${
    props => props.theme.global.focus.border.color
  };
  box-shadow: 0 0 2px 2px ${
    props => props.theme.global.focus.border.color
  };
`;

export const inputStyle = css`
  box-sizing: border-box;
  padding: ${props => (
    (parseMetricToNum(props.theme.global.spacing) / 2) -
    parseMetricToNum(props.theme.global.input.border.width)
  )}px;
  border: ${props => props.theme.global.input.border.width} solid ${props => props.theme.global.input.border.color};
  border-radius: ${props => props.theme.global.input.border.radius};
  outline: none;
  background-color: transparent;
  color: inherit;
  font: inherit;
  margin: 0;
`;

export default {
  activeStyle, backgroundStyle, baseStyle, inputStyle, focusStyle,
};
