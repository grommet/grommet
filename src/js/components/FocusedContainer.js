import React, { useContext, useEffect, useRef, useState } from 'react';

import { makeNodeFocusable, makeNodeUnfocusable } from '../utils';
import { GrommetContext } from './Grommet/GrommetContext';

const isNotAncestorOf = child => parent => !parent.contains(child);

export const FocusedContainer = ({
  hidden = false,
  restrictScroll = false,
  children,
  trapFocus,
  ...rest
}) => {
  const [bodyOverflowStyle, setBodyOverflowStyle] = useState('');
  const ref = useRef(null);

  const bodyChildrenFromGrommet = useContext(GrommetContext);
  useEffect(() => {
    if (bodyChildrenFromGrommet && ref && ref.current) {
      // Add node to array that tracks elements that come from Grommet
      // so we know to handle their aria-hidden value
      bodyChildrenFromGrommet.push(ref.current);
    }
  }, [bodyChildrenFromGrommet]);

  useEffect(() => {
    const handleNodeFocusable = (child, handleFocusable) => {
      // bodyChildrenFromGrommet[0] is ref of Grommet tag, make sure
      // we have a value for it
      if (bodyChildrenFromGrommet && bodyChildrenFromGrommet[0] !== null)
        bodyChildrenFromGrommet
          .filter(isNotAncestorOf(child))
          .forEach(handleFocusable);
    };

    const removeTrap = () => {
      const child = ref.current;
      handleNodeFocusable(child, makeNodeFocusable);

      if (restrictScroll) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };

    const handleTrapFocus = () => {
      const child = ref.current;
      handleNodeFocusable(child, makeNodeUnfocusable);

      if (restrictScroll && bodyOverflowStyle !== 'hidden') {
        setBodyOverflowStyle(document.body.style.overflow);
        document.body.style.overflow = 'hidden';
      }
    };

    const timer = setTimeout(() => {
      if (!hidden && trapFocus) {
        handleTrapFocus();
      }
    }, 0);

    return () => {
      removeTrap();
      clearTimeout(timer);
    };
  }, [
    hidden,
    bodyOverflowStyle,
    restrictScroll,
    trapFocus,
    bodyChildrenFromGrommet,
  ]);

  return (
    <div ref={ref} aria-hidden={hidden} {...rest}>
      {children}
    </div>
  );
};
