import { css } from 'styled-components';

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

export function parseMetricToInt(fontAsString) {
  return parseInt(fontAsString.replace(/[^0-9]/g, ''), 10);
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

export default { findAllByType, focusStyle, parseMetricToInt };
