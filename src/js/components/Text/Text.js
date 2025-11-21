import React, { forwardRef, useMemo, useState } from 'react';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { StyledText } from './StyledText';
import { Tip } from '../Tip';
import { useForwardedRef, getTextFromReactNode, useId } from '../../utils';
import { TextPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { TextSkeleton } from './TextSkeleton';
import { TextContext } from './TextContext';
import { useThemeValue } from '../../utils/useThemeValue';

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
        (tipProp?.content && getTextFromReactNode(tipProp?.content)) ||
        undefined,
      truncate,
      size,
      skeleton: skeletonProp,
      level = 1,
      ...rest
    },
    ref,
  ) => {
    const [textTruncated, setTextTruncated] = useState(false);
    const textContextValue = useMemo(() => ({ size }), [size]);
    const { passThemeFlag } = useThemeValue();
    const textRef = useForwardedRef(ref);
    const tipId = useId();
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
      window.addEventListener('pagechange', updateTip);
      updateTip();
      return () => {
        window.removeEventListener('resize', updateTip);
        window.removeEventListener('pagechange', updateTip);
      };
    }, [textRef, truncate]);

    if (skeleton) {
      return (
        <TextSkeleton
          ref={ref}
          as={as}
          level={level}
          size={size}
          {...skeletonProp}
          {...rest}
        />
      );
    }

    let extraA11yProps = {};

    if (tipProp || textTruncated) {
      extraA11yProps = {
        tabIndex: 0,
        'aria-describedby': tipId,
      };
    }

    const styledTextResult = (
      <StyledText
        as={!as && tag ? tag : as}
        colorProp={color}
        aria-label={a11yTitle}
        level={level}
        truncate={truncate}
        size={size}
        {...passThemeFlag}
        {...rest}
        {...extraA11yProps}
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
      let tipProps = tipProp && typeof tipProp === 'object' ? tipProp : {};
      tipProps = { ...tipProps, id: tipId };
      // place the text content in a tip if truncate === 'tip'
      // and the text has been truncated
      if (textTruncated) {
        return (
          <Tip content={children} {...tipProps}>
            {styledTextResult}
          </Tip>
        );
      }
      // place the text content in a tip if truncate !== 'tip'
      // it displays even if the text has not truncated
      if (truncate !== 'tip') {
        return <Tip {...tipProps}>{styledTextResult}</Tip>;
      }
    }

    return styledTextResult;
  },
);

Text.displayName = 'Text';
Text.propTypes = TextPropTypes;

export { Text };
