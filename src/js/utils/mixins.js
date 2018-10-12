import { css } from 'styled-components';

export const parseMetricToNum = fontAsString => (
  parseFloat(fontAsString.replace(/[^0-9/.]/g, ''), 10));

export const fontSize = (size, lineHeight) => css`
  font-size: ${
    props => `${(parseMetricToNum(size) / parseMetricToNum(props.theme.global.font.size)) * 1}rem`
  };
  line-height: ${props => (
    lineHeight || (
      `${Math.ceil(parseMetricToNum(size) / parseMetricToNum(props.theme.global.lineHeight))
        * (parseMetricToNum(props.theme.global.lineHeight) / parseMetricToNum(size))}px`
    )
  )};
`;

export const lapAndUp = content => css`
  @media only screen and (min-width: ${props => `${props.theme.global.breakpoints.narrow + 1}px`}) { ${content} }
`;

export const palm = content => css`
  @media only screen and (max-width: ${props => `${props.theme.global.breakpoints.narrow}px`}) { ${content} }
`;

export const findAllByType = (component, type) => {
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
};

export const getAvailableAtBadge = availableAt => [
  {
    url: `https://storybook.grommet.io/?selectedKind=${availableAt}&full=0&addons=0&stories=1&panelRight=0`,
    badge: 'https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png',
    label: 'Storybook',
  },
  {
    url: `https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=${availableAt.toLowerCase()}&module=%2Fsrc%2F${availableAt}.js`,
    badge: 'https://codesandbox.io/static/img/play-codesandbox.svg',
    label: 'CodeSandbox',
  },
];
