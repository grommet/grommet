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

    // if margin is a string, parse it or use the theme value
    const normalizeMargin = (margin) => {
      if (typeof margin === 'string') {
        const value = theme.global.edgeSize[margin] || parseInt(margin, 10);
        return { top: value, bottom: value, left: value, right: value };
      }
      return { top: 0, bottom: 0, left: 0, right: 0 };
    };

    const tipMarginStyle = (theme, align) => {
      const themeDropMargin =
        theme.global.edgeSize[theme.global?.drop?.margin] ||
        theme.global.drop.margin;
      const themeTipMargin =
        theme.global.edgeSize[theme.tip?.content?.margin] ||
        theme.tip.content.margin;

      const parsedThemeDropMargin =
        typeof themeDropMargin === 'string'
          ? parseInt(themeDropMargin, 10)
          : themeDropMargin;
      const parsedThemeTipMargin =
        typeof themeTipMargin === 'string'
          ? parseInt(themeTipMargin, 10)
          : themeTipMargin;

      const adjustedMargin = {};
      // if themeDropMargin is an object, use the values directly
      if (typeof themeDropMargin === 'object') {
        adjustedMargin.top = themeDropMargin.top || 0;
        adjustedMargin.bottom = themeDropMargin.bottom || 0;
        adjustedMargin.left = themeDropMargin.left || 0;
        adjustedMargin.right = themeDropMargin.right || 0;
      } else if (
        // Apply intelligent margin logic based on alignment
        theme.global.drop.intelligentMargin === true &&
        typeof themeDropMargin === 'string'
      ) {
        if (align.top === 'bottom')
          adjustedMargin.top = `${
            parsedThemeDropMargin + parsedThemeTipMargin
          }px`;
        if (align.bottom === 'top')
          adjustedMargin.bottom = `${
            parsedThemeDropMargin + parsedThemeTipMargin
          }px`;
        if (align.right === 'left')
          adjustedMargin.right = `${
            parsedThemeDropMargin + parsedThemeTipMargin
          }px`;
        if (align.left === 'right')
          adjustedMargin.left = `${
            parsedThemeDropMargin + parsedThemeTipMargin
          }px`;
        if (align.top === 'top' && align.left === 'left')
          adjustedMargin.top = `${
            parsedThemeDropMargin + parsedThemeTipMargin
          }px`;
      }
      return adjustedMargin;
    };

    const finalMargin = {
      ...normalizeMargin(theme.tip.content.margin),
      ...tipMarginStyle(
        theme,
        dropProps?.align || { top: 'top', left: 'left' }, // Default align
      ),
    };

    // if dropProps.margin is set that takes precedence wont use theme
    // If dropProps.margin is given add to the tip margin
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
