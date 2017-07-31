import { css } from 'styled-components';

import { parseMetricToInt } from './utils';

const lapStart = '481px';

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

export default { lapAndUp };
