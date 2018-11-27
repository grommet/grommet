import React from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledHeading } from './StyledHeading';

const Heading = props => {
  const {
    color, // munged to avoid styled-components putting it in the DOM
    level,
    ...rest
  } = props;

  // enforce level to be a number
  return (
    <StyledHeading
      as={`h${level}`}
      colorProp={color}
      level={+level}
      {...rest}
    />
  );
};

Heading.defaultProps = {
  level: 1,
  responsive: true,
};

let HeadingDoc;
if (process.env.NODE_ENV !== 'production') {
  HeadingDoc = require('./doc').doc(Heading); // eslint-disable-line global-require
}
const HeadingWrapper = compose(withTheme)(HeadingDoc || Heading);

export { HeadingWrapper as Heading };
