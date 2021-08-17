import React, { forwardRef } from 'react';

import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropTypes } from './propTypes';

const Paragraph = forwardRef(({ color, fill, ...rest }, ref) => (
  <StyledParagraph ref={ref} colorProp={color} fillProp={fill} {...rest} />
));

Paragraph.displayName = 'Paragraph';
Paragraph.prototype = ParagraphPropTypes;

export { Paragraph };
