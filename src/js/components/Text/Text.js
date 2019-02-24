import React from 'react';
import PropTypes from 'prop-types';
import { StyledText } from './StyledText';

const Text = ({ color, tag, as, ...rest }) => (
  <StyledText as={!as && tag ? tag : as} colorProp={color} {...rest} />
);

Text.defaultProps = {
  level: 1,
};

let TextDoc;
if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}
const TextWrapper = TextDoc || Text;

export { TextWrapper as Text };

Text.propTypes = {
  children: PropTypes.node,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  color: PropTypes.string,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge", "xxlarge"]),
  tag: PropTypes.string,
  as: PropTypes.string,
  textAlign: PropTypes.oneOf(["start", "center", "end"]),
  truncate: PropTypes.bool,
  weight: PropTypes.number,
  level: PropTypes.number,
}

/* Export default for UXPin Merge */
export default Text;