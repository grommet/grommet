import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { useForwardedRef, useKeyboard } from '../../utils';
import { TipPropTypes } from './propTypes';

const Tip = forwardRef(
  ({ children, content, dropProps, show, onShow, plain }, tipRef) => {
    const theme = useContext(ThemeContext);
    const [visible, setVisibility] = useState(false);
    const usingKeyboard = useKeyboard();
    const componentRef = useForwardedRef(tipRef);
    const [prevShow, setPrevShow] = useState(show);
    if (show !== prevShow) {
      setPrevShow(show);
      setVisibility(show);
    }

    if (visible && onShow && show) {
      onShow();
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

    const tipMouseEvents =
      show === undefined
        ? {
            onMouseEnter: (event) => {
              setVisibility(true);
              if (child.props?.onMouseEnter) child.props.onMouseEnter(event);
            },
            onMouseLeave: (event) => {
              setVisibility(false);
              if (child.props?.onMouseLeave) child.props.onMouseLeave(event);
            },
            onFocus: (event) => {
              if (usingKeyboard) setVisibility(true);
              if (child.props?.onFocus) child.props.onFocus(event);
            },
            onBlur: (event) => {
              if (usingKeyboard) setVisibility(false);
              if (child.props?.onBlur) child.props.onBlur(event);
            },
          }
        : {};

    const clonedChild = cloneElement(child, {
      ...tipMouseEvents,
      key: 'tip-child',
      ref: (node) => {
        // https://github.com/facebook/react/issues/8873#issuecomment-287873307
        if (typeof componentRef === 'function') {
          componentRef(node);
        } else if (componentRef) {
          // eslint-disable-next-line no-param-reassign
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

    return [
      clonedChild,
      visible && (
        <Drop
          target={componentRef.current}
          trapFocus={false}
          key="tip-drop"
          {...theme.tip.drop}
          {...dropProps}
        >
          {plain ? content : <Box {...theme.tip.content}>{content}</Box>}
        </Drop>
      ),
    ];
  },
);

Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;

export { Tip };
