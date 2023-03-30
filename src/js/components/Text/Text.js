import React, { forwardRef, useMemo, useState } from 'react';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { StyledText } from './StyledText';
import { Tip } from '../Tip';
import { useForwardedRef } from '../../utils';
import { TextPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { TextSkeleton } from './TextSkeleton';
import { TextContext } from './TextContext';

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
      size,
      skeleton: skeletonProp,
      ...rest
    },
    ref,
  ) => {
    const textRef = useForwardedRef(ref);
    const [textTruncated, setTextTruncated] = useState(false);
    const textContextValue = useMemo(() => ({ size }), [size]);

    const skeleton = useSkeleton();

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

    if (skeleton) {
      return (
        <TextSkeleton
          ref={ref}
          as={as}
          size={size}
          {...skeletonProp}
          {...rest}
        />
      );
    }

    const styledTextResult = (
      <StyledText
        as={!as && tag ? tag : as}
        colorProp={color}
        aria-label={a11yTitle}
        truncate={truncate}
        size={size}
        {...rest}
        ref={textRef}
      >
        {children !== undefined ? (
          <TextContext.Provider value={textContextValue}>
            {children}
          </TextContext.Provider>
        ) : undefined}
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
