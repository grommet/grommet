import React, {
  cloneElement,
  forwardRef,
  useContext,
  useState,
  useRef,
} from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Drop } from '../Drop';

const Tip = forwardRef(({ children, content, dropProps }, tipRef) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [over, setOver] = useState(false);

  // console.log(tipRef);
  const ref = useRef();
  const componentRef = tipRef || ref;

  const wrapChildIfString = child => {
    // Handle the use case of a primitive string child
    // so we'll be able to assign ref and events on the child.
    // console.log(child);
    return typeof child === 'string' ? <span>{child}</span> : child;
  };

  const clonedChild = React.Children.map(children, child =>
    cloneElement(wrapChildIfString(child), {
      onMouseOver: () => setOver(true),
      onMouseLeave: () => setOver(false),
      onFocus: () => setOver(true),
      onBlur: () => setOver(false),
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
    }),
  );

  return [
    clonedChild,
    over && (
      <Drop
        align={{ left: 'right' }} // most common use case is a sidebar?!
        target={componentRef.current}
        trapFocus={false}
        key="tip-drop"
        plain
        {...theme.tip.drop}
        {...dropProps}
      >
        <Box {...theme.tip.content}>{content}</Box>
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
