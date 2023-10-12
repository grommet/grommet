import React, { forwardRef } from 'react';

import { StyledGrid } from './StyledGrid';
import { GridPropTypes } from './propTypes';

const Grid = forwardRef((props, ref) => {
  const {
    a11yTitle,
    'aria-label': ariaLabel,
    border,
    fill, // munged to avoid styled-components putting it in the DOM
    height, // munged to avoid styled-components putting it in the DOM
    responsive = true,
    rows, // munged to avoid styled-components putting it in the DOM
    tag,
    as,
    width, // munged to avoid styled-components putting it in the DOM
    ...rest
  } = props;

  return (
    <StyledGrid
      ref={ref}
      a11yTitleProp={ariaLabel || a11yTitle}
      as={!as && tag ? tag : as}
      border={border}
      fillContainer={fill}
      heightProp={height}
      responsive={responsive}
      rowsProp={rows}
      widthProp={width}
      {...rest}
    />
  );
});

Grid.displayName = 'Grid';
Grid.propTypes = GridPropTypes;

// Defualting to true to support existing code that relies on
// grid.available to create a fallback option
Grid.available = true;

export { Grid };
