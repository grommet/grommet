import React, { forwardRef } from 'react';

import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropType } from './propTypes';

const Paragraph = forwardRef(({ color, fill, ...rest }, ref) => (
  <StyledParagraph ref={ref} colorProp={color} fillProp={fill} {...rest} />
));

Paragraph.displayName = 'Paragraph';
Paragraph.prototype = ParagraphPropType;

export { Paragraph };
