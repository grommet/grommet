import { css } from 'styled-components';

import { parseMetricToInt } from './styles';

export * from './styles';
export * from './DOM';
export { default as Drop } from './Drop';
export { default as KeyboardAccelerators } from './KeyboardAccelerators';

export function findAllByType(component, type) {
  let matches = [];

  if (component.type === type) {
    matches.push(component);
  }

  if (component.children) {
    component.children.forEach((child) => {
      matches = matches.concat(findAllByType(child, type));
    });
  }

  return matches;
}

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

const lapStart = '481px';
export function lapAndUp(content) {
  return `
    @media only screen and (min-width:${lapStart}) { ${content}; }
  `;
}
