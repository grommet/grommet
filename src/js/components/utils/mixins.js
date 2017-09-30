import { css } from 'styled-components';

export function parseMetricToInt(fontAsString) {
  return parseInt(fontAsString.replace(/[^0-9]/g, ''), 10);
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

export function lapAndUp(content) {
  return css`
    @media only screen and (min-width:${props => `${props.theme.global.breakpoints.narrow + 1}px`}) { ${content}; }
  `;
}

export function palm(content) {
  return css`
    @media only screen and (max-width:${props => `${props.theme.global.breakpoints.narrow}px`}) { ${content}; }
  `;
}

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

export default {
  fontSize, findAllByType, lapAndUp, palm,
};
