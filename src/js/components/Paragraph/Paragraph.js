import React, { forwardRef, useMemo } from 'react';

import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';
import { TextContext } from '../Text/TextContext';
import { convertRestToTransientProps } from '../../utils';

const Paragraph = forwardRef(
  ({ children, color, fill, size, ...restProps }, ref) => {
    const skeleton = useSkeleton();
    const textContextValue = useMemo(() => ({ size }), [size]);
    const rest = convertRestToTransientProps(restProps);

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
        $colorProp={color}
        $fill={fill}
        $size={size}
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
