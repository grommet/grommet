import React, { forwardRef, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';

import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';
import { TextContext } from '../Text/TextContext';
import { useThemeValue } from '../../utils/useThemeValue';

const Paragraph = forwardRef(
  ({ children, color, fill, size, ...rest }, ref) => {
    const theme = useThemeValue();
    const withinThemeContext = useContext(ThemeContext);
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
        {...(withinThemeContext === undefined ? { theme } : {})}
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
