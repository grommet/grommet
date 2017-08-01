import { css } from 'styled-components';

export function parseMetricToInt(fontAsString) {
  return parseInt(fontAsString.replace(/[^0-9]/g, ''), 10);
}

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

export default {
  inputStyle,
  findAllByType,
  focusStyle,
  fontSize,
  lapAndUp,
  parseMetricToInt,
};
