import React, { forwardRef } from 'react';

import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';

const Paragraph = forwardRef(({ color, fill, ...rest }, ref) => {
  const skeleton = useSkeleton();
  if (skeleton) {
    return <ParagraphSkeleton ref={ref} fill={fill} {...rest} />;
  }
  return (
    <StyledParagraph ref={ref} colorProp={color} fillProp={fill} {...rest} />
  );
});

Paragraph.displayName = 'Paragraph';
Paragraph.prototype = ParagraphPropTypes;

export { Paragraph };
