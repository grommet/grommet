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
// 5. theme.tip.content.margin is none
// Output: The correct margin based on the alignment should
// be passed as the final margin to the div after the drop

// Scenario 2:
// 1. No dropProps.margin
// 2. theme.global.drop.intelligentMargin = false
// 3. theme.global.drop.margin is a string
// 5. theme.tip.content.margin is none
// Output: The margin will be set to all sides for the margin on
// the div after the drop

// Scenario 3:
// 1. dropProps.margin
// Output: If dropProps.margin is passed, it will be used as the margin
// on the div after the drop regardless of the value of the
// theme.global.drop.margin and the intelligentMargin property

const calculateCombinedMargin = (theme, dropProps) => {
  const finalMargin = { top: 0, bottom: 0, left: 0, right: 0 };

  const themeDropMargin = theme.global.drop.margin;
  const { intelligentMargin } = theme.global.drop;
  const align = dropProps?.align ||
    theme.tip.drop.align || {
      top: 'top',
      left: 'left',
    };

  // Convert a margin value from theme or string to a number in px
  const getMarginValue = (value) =>
    parseInt(theme.global.edgeSize?.[value], 10) || parseInt(value, 10) || 0;

  // If intelligentMargin is true and theme.global.drop margin is a string,
  // apply directional logic so that the margin is applied to the correct side
  // of the drop.
  if (intelligentMargin && typeof themeDropMargin === 'string') {
    const pxValue = getMarginValue(themeDropMargin);
    if (align.top === 'bottom') finalMargin.top = pxValue;
    if (align.bottom === 'top') finalMargin.bottom = pxValue;
    if (align.left === 'right') finalMargin.left = pxValue;
    if (align.right === 'left') finalMargin.right = pxValue;
  }
  // If the theme margin is an object
  else if (typeof themeDropMargin === 'object') {
    Object.entries(themeDropMargin).forEach(([key, value]) => {
      const pxValue = getMarginValue(value);
      if (key === 'horizontal') {
        finalMargin.left = pxValue;
        finalMargin.right = pxValue;
      } else if (key === 'vertical') {
        finalMargin.top = pxValue;
        finalMargin.bottom = pxValue;
      } else {
        finalMargin[key] = pxValue;
      }
    });
  }
  // If theme.global.drop is a string, and intelligent margin is
  // false apply string value uniformly to all sides
  else if (typeof themeDropMargin === 'string') {
    const pxValue = getMarginValue(themeDropMargin);
    ['top', 'bottom', 'left', 'right'].forEach((side) => {
      finalMargin[side] = pxValue;
    });
  }

  // add back in px to the margin values
  Object.keys(finalMargin).forEach((key) => {
    finalMargin[key] = `${finalMargin[key]}px`;
  });

  return finalMargin;
};

/*
 * This function getReactNodeRef is adapted from
 * [Material UI] (https://github.com/mui/material-ui)
 * Licensed under the MIT License (c) 2024 aarongarciah
 * The function has been modified from its original version.
 */
const getReactNodeRef = (element) => {
  if (!element || !React.isValidElement(element)) {
    return null;
  }

  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to
  // children in older versions
  return {}.propertyIsEnumerable.call(element.props, 'ref')
    ? element.props.ref
    : element.ref;
};

const Tip = forwardRef(
  ({ children, content, defaultVisible = false, dropProps, plain }, tipRef) => {
    const { theme } = useThemeValue();
    const [over, setOver] = useState(false);
    const [tooltipOver, setTooltipOver] = useState(false);
    const usingKeyboard = useKeyboard();

    const componentRef = useForwardedRef(tipRef);

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
        const callerRef = getReactNodeRef(child);
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

    // get the margin value from the theme
    const adjustedMargin = calculateCombinedMargin(theme, dropProps);
    // remove the non stylistic props from the theme tip drop object
    const {
      margin,
      align,
      inline,
      onClickOutside,
      onEsc,
      overFlow,
      responsive,
      restrictFocus,
      stretch,
      target,
      trapFocus,
      ...tipDropStyles
    } = theme.tip.drop || {};
    const { background, elevation, round, ...dropPropsWithoutStyles } =
      dropProps || {};
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
            {...dropPropsWithoutStyles}
            onMouseEnter={() => setTooltipOver(true)}
            onMouseLeave={() => setTooltipOver(false)}
            // to allow cursor to move between drop target and tip,
            // place margin on internal box and set margin to 0 on drop
            // and set elevation to none to avoid shadow and background
            margin="0px"
            elevation="none"
            background="transparent"
          >
            <Box
              // if margin is passed through dropProps, use it
              // otherwise use the default margin from theme
              // if margin is 'none' from theme, use combinedMargin
              // this should be the place where margin is set from any drop
              // margin
              margin={
                dropProps?.margin ||
                (theme.tip.drop.margin !== 'none' && theme.tip.drop.margin) ||
                adjustedMargin
              }
            >
              <Box
                {...tipDropStyles}
                background={dropProps?.background || theme.tip.drop.background}
                elevation={dropProps?.elevation}
                round={dropProps?.round}
              >
                {plain ? content : <Box {...theme.tip.content}>{content}</Box>}
              </Box>
            </Box>
          </Drop>
        </Keyboard>
      ),
    ];
  },
);

Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;

export { Tip };
