import React, {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { Keyboard } from '../Keyboard';
import { useForwardedRef, useKeyboard } from '../../utils';
import { TipPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

// Scenario 1:
// 1. No dropProps.margin
// 2. theme.global.drop.intelligentMargin = true
// 3. theme.global.drop.margin is a string
// 5. theme.tip.content.margin is a string
// Output: Combined margin should only apply between the target and the tip,
// theme.tip.content.margin should apply to remaining sides.
//
// Scenario 2:
// 1. No dropProps.margin
// 2. theme.global.drop.intelligentMargin = false
// 3. theme.global.drop.margin is a string
// 4. theme.tip.content.margin is an string
// Output: Combined margin should apply to all sides.
//
// Scenario 3:
// 1. No dropProps.margin
// 2. theme.global.drop.intelligentMargin = false
// 3. theme.global.drop.margin is a string
// 4. theme.tip.content.margin is an object
// Output: Combined margin should apply to all theme-defined sides.
//
// Scenario 4:
// 1. No dropProps.margin
// 2. theme.global.drop.intelligentMargin = true
// 3. theme.global.drop.margin is a string
// 4. theme.tip.content.margin is an object
// Output: Combined margin should only apply between the target and the tip,
// theme.tip.content.margin should apply to remaining theme-defined sides.
//
// Scenario 5:
// 1. dropProps.margin is a string
// 2. theme.global.drop.intelligentMargin = true
// 3. theme.global.drop.margin is a string
// 4. theme.tip.content.margin is an string
// Output: Combined margin of dropProps.margin and theme.tip.content.margin
// should only apply between the target and the tip, theme.tip.content.margin
// should apply to remaining sides.
// ...

/**
 * Calculates the combined margin for the tip based on the theme and dropProps.
 * It normalizes the margin values and applies intelligent margin logic
 * based on the alignment of the drop. The final margin is returned as an
 * object with top, bottom, left, and right properties.
 */
const calculateCombinedMargin = (theme, dropProps) => {
  const normalizeMargin = (margin) => {
    if (typeof margin === 'string') {
      const value =
        parseInt(theme.global.edgeSize[margin], 10) || parseInt(margin, 10);
      return { top: value, bottom: value, left: value, right: value };
    }
    return {
      top: margin?.top
        ? parseInt(theme.global.edgeSize[margin.top], 10) ||
          parseInt(margin.top, 10)
        : 0,
      bottom: margin?.bottom
        ? parseInt(theme.global.edgeSize[margin.bottom], 10) ||
          parseInt(margin.bottom, 10)
        : 0,
      left: margin?.left
        ? parseInt(theme.global.edgeSize[margin.left], 10) ||
          parseInt(margin.left, 10)
        : 0,
      right: margin?.right
        ? parseInt(theme.global.edgeSize[margin.right], 10) ||
          parseInt(margin.right, 10)
        : 0,
    };
  };

  const themeDropMargin = normalizeMargin(theme.global.drop.margin);
  const themeTipMargin = normalizeMargin(theme.tip.content.margin);
  const dropMarginProp = dropProps?.margin
    ? normalizeMargin(dropProps.margin)
    : undefined;

  const align = dropProps?.align ||
    theme.tip.drop.align || { top: 'top', left: 'left' };

  const finalMargin = { top: 0, bottom: 0, left: 0, right: 0 };

  if (dropMarginProp) {
    // TO DO revisit this condition based on response for this comment
    // https://github.com/grommet/grommet/pull/7568/files#r2029432487
    if (theme.global.drop.intelligentMargin) {
      // Apply margin only on the side defined by align
      if (align.top === 'bottom') finalMargin.top = dropMarginProp.top;
      if (align.bottom === 'top') finalMargin.bottom = dropMarginProp.bottom;
      if (align.left === 'right') finalMargin.left = dropMarginProp.left;
      if (align.right === 'left') finalMargin.right = dropMarginProp.right;
    } else {
      // Apply dropProps.margin to all defined sides
      Object.assign(finalMargin, dropMarginProp);
    }
  } else if (theme.global.drop.intelligentMargin) {
    // Apply intelligent margin logic based on alignment
    if (align.top === 'bottom') finalMargin.top = themeDropMargin.top;
    if (align.bottom === 'top') finalMargin.bottom = themeDropMargin.bottom;
    if (align.left === 'right') finalMargin.left = themeDropMargin.left;
    if (align.right === 'left') finalMargin.right = themeDropMargin.right;
  } else {
    // Apply theme.global.drop.margin to all defined sides
    Object.assign(finalMargin, themeDropMargin);
  }

  // Always add themeTipMargin at the end
  finalMargin.top += parseInt(themeTipMargin.top, 10);
  finalMargin.bottom += parseInt(themeTipMargin.bottom, 10);
  finalMargin.left += parseInt(themeTipMargin.left, 10);
  finalMargin.right += parseInt(themeTipMargin.right, 10);

  // Convert to pixel values
  Object.keys(finalMargin).forEach((key) => {
    finalMargin[key] = `${finalMargin[key]}px`;
  });

  return finalMargin;
};

const Tip = forwardRef(
  ({ children, content, defaultVisible = false, dropProps, plain }, tipRef) => {
    const { theme } = useThemeValue();
    const [over, setOver] = useState(false);
    const [tooltipOver, setTooltipOver] = useState(false);
    const usingKeyboard = useKeyboard();

    const componentRef = useForwardedRef(tipRef);

    const combinedMargin = calculateCombinedMargin(theme, dropProps);

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
        <Keyboard
          key="tip-keyboard"
          onEsc={() => {
            setOver(false);
            setTooltipOver(false);
          }}
        >
          <Drop
            target={componentRef.current}
            trapFocus={false}
            key="tip-drop"
            {...theme.tip.drop}
            {...dropProps}
            onMouseEnter={() => setTooltipOver(true)}
            onMouseLeave={() => setTooltipOver(false)}
            // to allow cursor to move between drop target and tip,
            // place margin on internal box
            margin="none"
          >
            {plain ? (
              content
            ) : (
              <Box {...theme.tip.content} margin={combinedMargin}>
                {content}
              </Box>
            )}
          </Drop>
        </Keyboard>
      ),
    ];
  },
);

Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;

export { Tip };
