import { css } from 'styled-components';

import { parseMetricToInt } from './mixins';
import { colorIsDark } from './colors';

export const backgroundStyle = (background, theme) => {
  if (typeof background === 'object') {
    if (background.image) {
      let color;
      if (background.dark === false) {
        color = theme.global.colors.text;
      } else if (background.dark) {
        color = theme.global.colors.darkBackgroundTextColor;
      } else {
        color = 'inherit';
      }
      return css`
        background: ${background.image} no-repeat center center;
        background-size: cover;
        color: ${color};
      `;
    }
    return undefined;
  }
  if (background.lastIndexOf('url', 0) === 0) {
    return css`
      background: ${background} no-repeat center center;
      background-size: cover;
    `;
  }
  const [kind, index] = background.split('-');
  const colorSet = theme.global.colors[kind];
  let color;
  if (Array.isArray(colorSet)) {
    color = theme.global.colors[kind][index];
  } else if (typeof colorSet === 'string') {
    color = colorSet;
  } else {
    color = background;
  }
  if (color) {
    return css`
      background-color: ${color};
      color: ${colorIsDark(color) ?
        theme.global.colors.darkBackgroundTextColor : theme.global.colors.text};
    `;
  }
  return undefined;
};

export const baseStyle = css`
  font-family: ${props => props.theme.global.font.family};
  font-size: ${props => `${(parseMetricToInt(props.theme.global.font.size) / 16) * 1}em`};
  line-height: ${props => (
    parseMetricToInt(props.theme.global.lineHeight) / parseMetricToInt(props.theme.global.font.size)
  )};
  color: ${props => props.theme.global.colors.text};
  background-color: ${props => props.theme.global.colors.background};

  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: inherit;
  }
`;

// focus also supports clickable elements inside svg
export const focusStyle = css`
  > :not(svg) {
    circle,
    ellipse,
    line,
    path,
    polygon,
    polyline,
    rect {
      outline: ${
        props => (
          props.theme.global.focus.border.color ||
          props.theme.global.colors.accent[0]
        )
      } solid 2px;
    }
  }
  border-color: ${
    props => (
      props.theme.global.focus.border.color ||
      props.theme.global.colors.accent[0]
    )
  };
  box-shadow: 0 0 1px 1px ${
    props => (
      props.theme.global.focus.border.color ||
      props.theme.global.colors.accent[0]
    )
  };
`;

export const inputStyle = css`
  padding: ${props => (
    (parseMetricToInt(props.theme.global.spacing) / 2) -
    parseMetricToInt(props.theme.global.input.border.width)
  )}px;
  border: ${props => props.theme.global.input.border.width} solid ${props => props.theme.global.input.border.color};
  border-radius: ${props => props.theme.global.input.border.radius};
  outline: none;
  background-color: transparent;
  color: inherit;
  font: inherit;
  margin: 0;

  ${props => props.focus && focusStyle}
`;

export default {
  backgroundStyle, baseStyle, inputStyle, focusStyle,
};
