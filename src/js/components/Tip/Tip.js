import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { useForwardedRef } from '../../utils/refs';
import { TipPropTypes } from './propTypes';

const Tip = forwardRef(({ children, content, dropProps, plain }, tipRef) => {
  const theme = useContext(ThemeContext);
  const [over, setOver] = useState(false);
  const [usingKeyboard, setUsingKeyboard] = useState();

  const onMouseDown = () => setUsingKeyboard(false);
  const onKeyDown = () => setUsingKeyboard(true);
  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    onFocus: () => {
      if (usingKeyboard) setOver(true);
    },
    onBlur: () => {
      if (usingKeyboard) setOver(false);
    },
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
    over && (
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
});

Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;

export { Tip };
