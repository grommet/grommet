import React, { forwardRef, useState } from 'react';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

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

    useLayoutEffect(() => {
      const updateTip = () => {
        setTextTruncated(false);
        if (
          truncate === 'tip' &&
          textRef.current &&
          textRef.current.scrollWidth > textRef.current.offsetWidth
        ) {
          setTextTruncated(true);
        }
      };
      window.addEventListener('resize', updateTip);
      updateTip();
      return () => window.removeEventListener('resize', updateTip);
    }, [textRef, truncate]);

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
      // place the text content in a tip if truncate === 'tip'
      // and the text has been truncated
      if (textTruncated) {
        return (
          <Tip content={children} {...tipProp}>
            {styledTextResult}
          </Tip>
        );
      }
      // place the text content in a tip if truncate !== 'tip'
      // it displays even if the text has not truncated
      if (truncate !== 'tip') {
        return <Tip {...tipProp}>{styledTextResult}</Tip>;
      }
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
