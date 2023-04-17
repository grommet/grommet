import React, { forwardRef, useMemo } from 'react';

import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';
import { TextContext } from '../Text/TextContext';

const Paragraph = forwardRef(
  ({ children, color, fill, size, ...rest }, ref) => {
    const skeleton = useSkeleton();
    const textContextValue = useMemo(() => ({ size }), [size]);

    if (skeleton) {
      return (
        <ParagraphSkeleton ref={ref} fill={fill} size={size} {...rest}>
          {children}
        </ParagraphSkeleton>
      );
    }
    return (
      <StyledParagraph
        ref={ref}
        colorProp={color}
        fillProp={fill}
        size={size}
        {...rest}
      >
        {children !== undefined ? (
          <TextContext.Provider value={textContextValue}>
            {children}
          </TextContext.Provider>
        ) : undefined}
      </StyledParagraph>
    );
  },
);

Paragraph.displayName = 'Paragraph';
Paragraph.prototype = ParagraphPropTypes;

export { Paragraph };
