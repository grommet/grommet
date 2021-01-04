import React, { forwardRef } from 'react';

import { StyledParagraph } from './StyledParagraph';

const Paragraph = forwardRef(({ color, fill, ...rest }, ref) => (
  <StyledParagraph ref={ref} colorProp={color} fillProp={fill} {...rest} />
));

Paragraph.displayName = 'Paragraph';

let ParagraphDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ParagraphDoc = require('./doc').doc(Paragraph);
}
const ParagraphWrapper = ParagraphDoc || Paragraph;

export { ParagraphWrapper as Paragraph };
