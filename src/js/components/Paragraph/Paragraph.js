import React from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledParagraph } from './StyledParagraph';

const Paragraph = ({ color, ...rest }) => (
  <StyledParagraph colorProp={color} {...rest} />
);

let ParagraphDoc;
if (process.env.NODE_ENV !== 'production') {
  ParagraphDoc = require('./doc').doc(Paragraph); // eslint-disable-line global-require
}
const ParagraphWrapper = compose(
  withTheme,
)(ParagraphDoc || Paragraph);

export { ParagraphWrapper as Paragraph };
