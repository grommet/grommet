import { css } from 'styled-components';

import { focusStyle, parseMetricToInt } from './utils';

const lapStart = '481px';

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

export function fontSize(size, lineHeight) {
  return css`
    font-size: ${
      props => `${(parseMetricToInt(size) / parseMetricToInt(props.theme.global.font.size)) * 1}rem`
    };
    line-height: ${props => (
      lineHeight || (
        `${Math.ceil(parseMetricToInt(size) / parseMetricToInt(props.theme.global.lineHeight)) *
        (parseMetricToInt(props.theme.global.lineHeight) / parseMetricToInt(size))}px`
      )
    )};
  `;
}

export function lapAndUp(content) {
  return `
    @media only screen and (min-width:${lapStart}) { ${content}; }
  `;
}

export default { inputStyle, fontSize, lapAndUp };
