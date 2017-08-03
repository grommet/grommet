import { css } from 'styled-components';

import { parseMetricToInt } from './mixins';

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

export const focusStyle = css`
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
  baseStyle, inputStyle, focusStyle,
};
