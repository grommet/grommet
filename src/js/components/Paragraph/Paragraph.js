import React from 'react';

import { StyledParagraph } from './StyledParagraph';

const Paragraph = ({ color, fill, ...rest }) => (
  <StyledParagraph colorProp={color} fillProp={fill} {...rest} />
);

let ParagraphDoc;
if (process.env.NODE_ENV !== 'production') {
  ParagraphDoc = require('./doc').doc(Paragraph); // eslint-disable-line global-require
}
const ParagraphWrapper = ParagraphDoc || Paragraph;

export { ParagraphWrapper as Paragraph };
