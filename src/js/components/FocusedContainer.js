import React, { useContext, useEffect, useRef, useState } from 'react';

import { makeNodeFocusable, makeNodeUnfocusable } from '../utils';
import { RootsContext } from '../contexts/RootsContext';

export const FocusedContainer = ({
  hidden = false,
  restrictScroll = false,
  children,
  trapFocus,
  ...rest
}) => {
  const [bodyOverflowStyle, setBodyOverflowStyle] = useState('');
  const ref = useRef(null);

  const root = useContext(RootsContext);
  const [updatedRoot, setUpdatedRoot] = useState(root);

  useEffect(() => {
    // make sure value of null is not added to array
    if (ref.current) setUpdatedRoot([...root, ref.current]);
  }, [root]);

  useEffect(() => {
    if (
      bodyOverflowStyle !== 'hidden' &&
      !hidden &&
      restrictScroll &&
      trapFocus
    ) {
      setBodyOverflowStyle(document.body.style.overflow);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (restrictScroll) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };
  }, [bodyOverflowStyle, hidden, trapFocus, restrictScroll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hidden && trapFocus && root && root[0] !== null) {
        root.forEach(makeNodeUnfocusable);
      }
    }, 0);

    return () => {
      // remove trap
      if (root && root[0] !== null) makeNodeFocusable(root[root.length - 1]);
      clearTimeout(timer);
    };
  }, [hidden, root, trapFocus]);

  return (
    <RootsContext.Provider value={updatedRoot}>
      <div ref={ref} aria-hidden={hidden} {...rest}>
        {children}
      </div>
    </RootsContext.Provider>
  );
};
