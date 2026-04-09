import React, { forwardRef, useMemo, useState } from 'react';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { StyledText } from './StyledText';
import { Tip } from '../Tip';
import { useForwardedRef } from '../../utils';
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
      a11yTitle,
      truncate,
      size,
      skeleton: skeletonProp,
      level = 1,
      ...rest
    },
    ref,
  ) => {
    const { passThemeFlag } = useThemeValue();
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
        tabIndex={
          rest.tabIndex ??
          (tipProp !== undefined || truncate === 'tip' ? 0 : undefined)
        }
        ref={textRef}
      >
        {children !== undefined ? (
          <TextContext.Provider value={textContextValue}>
            {children}
          </TextContext.Provider>
        ) : undefined}
      </StyledText>
    );

    // When tip is a string, use it as the tooltip content.
    // When tip is an object, spread it as props
    // (content comes from tipProp.content).
    const tipProps = tipProp && typeof tipProp === 'object' ? tipProp : {};

    if (tipProp || textTruncated) {
      // place the text content in a tip if truncate === 'tip'
      // and the text has been truncated
      if (textTruncated) {
        // For string tip, the string IS the content. For object tip, content
        // comes from tipProps.content via spread. For no tip (textTruncated
        // only), fall back to the visible children text wrapped in aria-hidden
        // so the SR reads the element text once rather than twice.
        const truncatedContent =
          typeof tipProp === 'string' ? (
            tipProp
          ) : (
            <span aria-hidden="true">{children}</span>
          );
        return (
          <Tip content={truncatedContent} {...tipProps}>
            {styledTextResult}
          </Tip>
        );
      }
      // place the text content in a tip if truncate !== 'tip'
      // it displays even if the text has not truncated
      if (truncate !== 'tip') {
        // For string tip, the string IS the tooltip content.
        // For object tip, content comes from tipProps.content via spread.
        const tipContent = typeof tipProp === 'string' ? tipProp : undefined;
        return (
          <Tip content={tipContent} {...tipProps}>
            {styledTextResult}
          </Tip>
        );
      }
    }

    return styledTextResult;
  },
);

Text.displayName = 'Text';
Text.propTypes = TextPropTypes;

export { Text };
