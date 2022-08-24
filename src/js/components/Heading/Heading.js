import React, { forwardRef } from 'react';

import { StyledHeading } from './StyledHeading';
import { HeadingPropTypes } from './propTypes';

const Heading = forwardRef(
  (
    { color, fill, level, weight, ...rest },
    ref, // munged to avoid styled-components putting it in the DOM
  ) => (
    // enforce level to be a number
    <StyledHeading
      as={`h${level}`}
      colorProp={color}
      fillProp={fill}
      level={+level}
      weight={weight}
      {...rest}
      ref={ref}
    />
  ),
);

Heading.displayName = 'Heading';
Heading.defaultProps = {
  level: 1,
  responsive: true,
};
Heading.propTypes = HeadingPropTypes;

export { Heading };
