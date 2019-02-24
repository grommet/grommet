import React from 'react';
import PropTypes from 'prop-types';
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
const HeadingWrapper = HeadingDoc || Heading;

export { HeadingWrapper as Heading };

Heading.propTypes = {
  children: PropTypes.node,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  color: PropTypes.string,
  level: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"]),
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "xlarge"]),
  textAlign: PropTypes.oneOf(["start", "center", "end"]),
  truncate: PropTypes.bool,
}

/* Export for UXPin Merge */
export default Heading;