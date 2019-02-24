import React from 'react';
import PropTypes from 'prop-types';

import { StyledParagraph } from './StyledParagraph';

const Paragraph = ({ color, ...rest }) => (
  <StyledParagraph colorProp={color} {...rest} />
);

let ParagraphDoc;
if (process.env.NODE_ENV !== 'production') {
  ParagraphDoc = require('./doc').doc(Paragraph); // eslint-disable-line global-require
}
const ParagraphWrapper = ParagraphDoc || Paragraph;

export { ParagraphWrapper as Paragraph };

/* PropTypes for UXPin Merge */
Paragraph.propTypes = {
  children: PropTypes.node,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf([
    'none',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  color: PropTypes.string,
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']),
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
};

/* Export default for UXPin Merge */
export default Paragraph;
