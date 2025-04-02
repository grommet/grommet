import React, {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { useForwardedRef, useKeyboard } from '../../utils';
import { TipPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const Tip = forwardRef(
  ({ children, content, defaultVisible = false, dropProps, plain }, tipRef) => {
    const { theme } = useThemeValue();
    const [over, setOver] = useState(false);
    const [tooltipOver, setTooltipOver] = useState(false);
    const usingKeyboard = useKeyboard();

    const componentRef = useForwardedRef(tipRef);

    const parseMargin = (value) => {
      if (typeof value === 'string') {
        if (value.includes('px')) {
          return parseInt(value.replace('px', ''), 10);
        }
        return parseInt(value, 10);
      }
      return value || 0;
    };

    const normalizeMargin = (margin, theme) => {
      if (typeof margin === 'string') {
        if (margin.includes('px')) {
          const value = parseInt(margin, 10);
          return { top: value, bottom: value, left: value, right: value };
        }
        const value = theme.global.edgeSize[margin] || margin;
        return { top: value, bottom: value, left: value, right: value };
      }
      return margin || { top: 0, bottom: 0, left: 0, right: 0 };
    };

    const tipMarginStyle = (theme, align, dropMargin) => {
      if (dropMargin) {
        return normalizeMargin(dropMargin, theme);
      }

      const margin =
        theme.global.edgeSize[theme?.global?.drop?.margin] ||
        theme.global.drop.margin;
      const themeTipMargin =
        theme.global.edgeSize[theme.tip.content.margin] ||
        theme.tip.content.margin;
      let adjustedMargin = {};

      const parsedMargin = parseMargin(margin);
      const parsedThemeTipMargin = parseMargin(themeTipMargin);

      // Apply intelligent margin logic based on alignment
      if (
        theme.global.drop.intelligentMargin === true &&
        typeof margin === 'string'
      ) {
        if (align.top === 'bottom')
          adjustedMargin.top = `${parsedMargin + parsedThemeTipMargin}px`;
        if (align.bottom === 'top')
          adjustedMargin.bottom = `${parsedMargin + parsedThemeTipMargin}px`;
        if (align.right === 'left')
          adjustedMargin.right = `${parsedMargin + parsedThemeTipMargin}px`;
        if (align.left === 'right')
          adjustedMargin.left = `${parsedMargin + parsedThemeTipMargin}px`;
        if (align.top === 'top' && align.left === 'left')
          adjustedMargin.top = `${parsedMargin + parsedThemeTipMargin}px`;
      }

      return adjustedMargin;
    };

    const finalMargin = {
      ...normalizeMargin(theme.tip.content.margin, theme),
      ...tipMarginStyle(
        theme,
        dropProps?.align || { top: 'top', left: 'left' }, // Default align
        dropProps?.margin, // If drop margin exists, use it
      ),
    };

    if (dropProps?.margin) {
      const dropMargin = normalizeMargin(dropProps.margin, theme);
      const themeTipMargin = normalizeMargin(
        theme.global.edgeSize[theme.tip.content.margin],
        theme,
      );

      finalMargin.top = `${themeTipMargin.top + dropMargin.top}px`;
      finalMargin.bottom = `${themeTipMargin.bottom + dropMargin.bottom}px`;
      finalMargin.left = `${themeTipMargin.left + dropMargin.left}px`;
      finalMargin.right = `${themeTipMargin.right + dropMargin.right}px`;
    }

    // Three use case for children
    // 1. Tip has a single child + it is a React Element => Great!
    // 2. Tip has a single child +  not React Element =>
    // span will wrap the child so we can use ref and events.
    // 3. Tip has more than one child => Abort, display Children.only error
    const child =
      (Children.count(children) <= 1 && !React.isValidElement(children) && (
        <span>{children}</span>
      )) ||
      Children.only(children);

    const clonedChild = cloneElement(child, {
      onMouseEnter: (event) => {
        setOver(true);
        if (child.props?.onMouseEnter) child.props.onMouseEnter(event);
      },
      onMouseLeave: (event) => {
        setOver(false);
        if (child.props?.onMouseLeave) child.props.onMouseLeave(event);
      },
      onFocus: (event) => {
        if (usingKeyboard) setOver(true);
        if (child.props?.onFocus) child.props.onFocus(event);
      },
      onBlur: (event) => {
        if (usingKeyboard) setOver(false);
        if (child.props?.onBlur) child.props.onBlur(event);
      },
      key: 'tip-child',
      ref: (node) => {
        // https://github.com/facebook/react/issues/8873#issuecomment-287873307
        if (typeof componentRef === 'function') {
          componentRef(node);
        } else if (componentRef) {
          componentRef.current = node;
        }
        // Call the original ref, if any
        const { ref: callerRef } = child;
        if (typeof callerRef === 'function') {
          callerRef(node);
        } else if (callerRef) {
          callerRef.current = node;
        }
      },
    });

    useEffect(() => {
      setOver(defaultVisible);
    }, [defaultVisible]);

    return [
      clonedChild,
      (over || tooltipOver) && (
        <Drop
          target={componentRef.current}
          trapFocus={false}
          key="tip-drop"
          {...theme.tip.drop}
          {...dropProps}
          onMouseEnter={() => setTooltipOver(true)}
          onMouseLeave={() => setTooltipOver(false)}
          margin="none"
        >
          {plain ? (
            content
          ) : (
            <Box {...theme.tip.content} margin={finalMargin}>
              {content}
            </Box>
          )}
        </Drop>
      ),
    ];
  },
);

Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;

export { Tip };
