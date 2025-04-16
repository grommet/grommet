import React, {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Drop } from '../Drop';
import { Keyboard } from '../Keyboard';
import { useForwardedRef, useKeyboard } from '../../utils';
import { TipPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const BufferBox = styled(Box)`
  position: fixed;
  background: transparent;
  z-index: 21;
  pointer-events: auto;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
const getMarginValue = (marginValue, theme, direction = 'vertical') => {
  const edgeSize = theme.global?.edgeSize || {};

  if (!marginValue || marginValue === 'none') return 0;
  if (typeof marginValue === 'string') {
    const numericValue =
      parseInt(edgeSize[marginValue], 10) || parseInt(marginValue, 10);
    return Number.isNaN(numericValue) ? 0 : numericValue;
  }

  if (typeof marginValue === 'object') {
    if (direction === 'vertical') {
      return (
        getMarginValue(marginValue.vertical, theme) ||
        getMarginValue(marginValue.top, theme) ||
        getMarginValue(marginValue.bottom, theme)
      );
    }

    if (direction === 'horizontal') {
      return (
        getMarginValue(marginValue.horizontal, theme) ||
        getMarginValue(marginValue.left, theme) ||
        getMarginValue(marginValue.right, theme)
      );
    }
  }
  return 0;
};

const calculateBufferPosition = (align, targetRect, margin, theme) => {
  const marginValue = getMarginValue(margin, theme);

  const position = {
    top: 0,
    left: 0,
    width: targetRect.width,
    height: 0,
  };

  if (align.top === 'bottom') {
    // Tooltip appears below the target, buffer goes below the target
    position.top = targetRect.bottom;
    position.height = marginValue;
    position.left = targetRect.left;
  } else if (align.bottom === 'top') {
    // Tooltip appears above the target, buffer goes above the target
    position.top = targetRect.top - marginValue;
    position.height = marginValue;
    position.left = targetRect.left;
  } else if (align.left === 'right') {
    // Tooltip appears to the right, buffer goes to the right
    position.top = targetRect.top;
    position.left = targetRect.right;
    position.width = marginValue;
    position.height = targetRect.height;
  } else if (align.right === 'left') {
    // Tooltip appears to the left, buffer goes to the left
    position.top = targetRect.top;
    position.left = targetRect.left - marginValue;
    position.width = marginValue;
    position.height = targetRect.height;
  }
  return position;
};

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

    const [buffer, setBuffer] = useState({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });
    // Get the margin from the theme or dropProps and ignore 'none'
    const resolveMargin = (...margins) =>
      margins.find((m) => m !== undefined && m !== 'none');
    const themeMargin = resolveMargin(
      dropProps?.margin,
      theme.tip.drop.margin,
      theme.global.drop.margin,
    );

    const calculateBuffer = React.useCallback(() => {
      if (!componentRef.current) return;
      const rect = componentRef.current.getBoundingClientRect();
      const align = dropProps?.align ||
        theme.tip.drop.align || {
          top: 'bottom',
          left: 'left',
        };

      const bufferBox = calculateBufferPosition(
        align,
        rect,
        themeMargin,
        theme,
      );
      setBuffer(bufferBox);
    }, [componentRef, dropProps, themeMargin, theme]);

    useEffect(() => {
      calculateBuffer();
    }, [calculateBuffer]);

    useEffect(() => {
      setOver(defaultVisible);
    }, [defaultVisible]);

    return (
      <>
        {clonedChild}
        {(over || tooltipOver) && (
          <>
            {themeMargin && (
              <BufferBox
                top={buffer.top}
                left={buffer.left}
                width={buffer.width}
                height={buffer.height}
                onMouseEnter={() => setTooltipOver(true)}
                onMouseLeave={() => setTooltipOver(false)}
              />
            )}
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
              >
                {plain ? content : <Box {...theme.tip.content}>{content}</Box>}
              </Drop>
            </Keyboard>
          </>
        )}
      </>
    );
  },
);

Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;

export { Tip };
