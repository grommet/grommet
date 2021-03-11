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
import { useForwardedRef } from '../../utils/refs';

const Tip = forwardRef(({ children, content, dropProps, plain }, tipRef) => {
  const theme = useContext(ThemeContext);
  const [over, setOver] = useState(false);

  const componentRef = useForwardedRef(tipRef);

  // In cases the child is a primitive
  const wrapInvalidElement = () =>
    // Handle the use case of a primitive string child
    // so we'll be able to assign ref and events on the child.
    !React.isValidElement(children) ? <span>{children}</span> : children;
  /* Three use case for children
    1. Tip has a single child + it is a React Element => Great!
    2. Tip has a single child +  not React Element => span will wrap the child.
    3. Tip has more than one child => Abort, display Children.only error 
  */
  const child =
    Children.count(children) === 1
      ? wrapInvalidElement()
      : Children.only(children);

  const clonedChild = cloneElement(child, {
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    onFocus: () => setOver(true),
    onBlur: () => setOver(false),
    key: 'tip-child',
    ref: node => {
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

let TipDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TipDoc = require('./doc').doc(Tip);
}
const TipWrapper = TipDoc || Tip;

export { TipWrapper as Tip };
