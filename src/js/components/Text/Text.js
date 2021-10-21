import React, { forwardRef, useEffect, useState } from 'react';

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
    const [textTruncated, setTextTruncated] = useState(false);

    // place the text content in a tip if truncate === 'tip'
    // and the text has been truncated
    useEffect(() => {
      if (truncate === 'tip') {
        if (
          textRef.current &&
          textRef.current.scrollWidth > textRef.current.offsetWidth
        ) {
          setTextTruncated(true);
        }
      }
    }, [children, textRef, truncate]);

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

    if (tipProp || textTruncated) {
      if (textTruncated) {
        return (
          <Tip content={children} {...tipProp}>
            {styledTextResult}
          </Tip>
        );
      }
      return <Tip {...tipProp}>{styledTextResult}</Tip>;
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
