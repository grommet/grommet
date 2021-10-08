import React, { forwardRef } from 'react';

import { StyledText } from './StyledText';
import { Tip } from '../Tip';
import { useForwardedRef } from '../../utils';
import { TextPropTypes } from './propTypes';

const Text = forwardRef(
  (
    {
      children,
      color,
      tag,
      as,
      tip: tipProp,
      // can't alphabetize a11yTitle before tip is defined
      a11yTitle = (typeof tipProp === 'string' && tipProp) ||
        tipProp?.content ||
        undefined,
      truncate,
      ...rest
    },
    ref,
  ) => {
    const textRef = useForwardedRef(ref);
    const styledTextResult = (
      <StyledText
        as={!as && tag ? tag : as}
        colorProp={color}
        aria-label={a11yTitle}
        truncate={truncate}
        {...rest}
        ref={textRef}
      >
        {children}
      </StyledText>
    );

    if (tipProp || truncate === 'tip') {
      return (
        <Tip content={children} {...tipProp}>
          {styledTextResult}
        </Tip>
      );
    }

    return styledTextResult;
  },
);

Text.displayName = 'Text';
Text.defaultProps = {
  level: 1,
};
Text.propTypes = TextPropTypes;

export { Text };
