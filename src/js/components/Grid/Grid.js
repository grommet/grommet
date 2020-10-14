import React, { forwardRef } from 'react';

import { StyledGrid } from './StyledGrid';

const Grid = forwardRef((props, ref) => {
  const {
    a11yTitle,
    border,
    fill, // munged to avoid styled-components putting it in the DOM
    responsive = true,
    rows, // munged to avoid styled-components putting it in the DOM
    tag,
    as,
    ...rest
  } = props;

  return (
    <StyledGrid
      ref={ref}
      a11yTitleProp={a11yTitle}
      as={!as && tag ? tag : as}
      border={border}
      fillContainer={fill}
      responsive={responsive}
      rowsProp={rows}
      {...rest}
    />
  );
});

Grid.displayName = 'Grid';

let GridDoc;
if (process.env.NODE_ENV !== 'production') {
  GridDoc = require('./doc').doc(Grid); // eslint-disable-line global-require
}
const GridWrapper = GridDoc || Grid;

GridWrapper.available =
  typeof window !== 'undefined' &&
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('display', 'grid');

export { GridWrapper as Grid };
