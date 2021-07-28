import React, { forwardRef, useEffect, useState } from 'react';

import { StyledText } from './StyledText';
import { Tip } from '../Tip';
import { useForwardedRef } from '../../utils';

const Text = forwardRef(
  (
    {
      children,
      color,
      tag,
      as,
      tip: tipProp,
      // can't alphabetize a11yTitle before tip is defined
      a11yTitle = typeof tipProp === 'string' ? tipProp : undefined,
      truncate,
      ...rest
    },
    ref,
  ) => {
    const textRef = useForwardedRef(ref);
    const [tip, setTip] = useState(tipProp);

    // place the text content in a tip if truncate === 'tip'
    // and the text has been truncated
    useEffect(() => {
      if (truncate === 'tip') {
        if (
          textRef.current &&
          textRef.current.scrollWidth > textRef.current.offsetWidth
        ) {
          setTip(children);
        } else setTip(undefined);
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

    if (tip) {
      if (typeof tip === 'string') {
        return <Tip content={tip}>{styledTextResult}</Tip>;
      }
      return <Tip {...tip}>{styledTextResult}</Tip>;
    }

    return styledTextResult;
  },
);

Text.displayName = 'Text';
Text.defaultProps = {
  level: 1,
};

let TextDoc;
if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}
const TextWrapper = TextDoc || Text;

export { TextWrapper as Text };
