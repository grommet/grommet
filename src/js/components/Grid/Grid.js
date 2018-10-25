import React from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledGrid } from './StyledGrid';

const styledComponents = {
  div: StyledGrid,
}; // tag -> styled component

const Grid = props => {
  const {
    fill, // munged to avoid styled-components putting it in the DOM
    rows, // munged to avoid styled-components putting it in the DOM
    tag,
    ...rest
  } = props;

  let StyledComponent = styledComponents[tag];
  if (!StyledComponent) {
    StyledComponent = StyledGrid.withComponent(tag);
    styledComponents[tag] = StyledComponent;
  }

  return <StyledComponent fillContainer={fill} rowsProp={rows} {...rest} />;
};

Grid.defaultProps = {
  tag: 'div',
};

let GridDoc;
if (process.env.NODE_ENV !== 'production') {
  GridDoc = require('./doc').doc(Grid); // eslint-disable-line global-require
}
const GridWrapper = compose(withTheme)(GridDoc || Grid);

GridWrapper.available =
  typeof window !== 'undefined' &&
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('display', 'grid');

export { GridWrapper as Grid };
