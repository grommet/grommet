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

  const roots = useContext(RootsContext);
  const [nextRoots, setNextRoots] = useState(roots);
  useEffect(() => {
    // make sure value of null is not added to array
    if (ref.current) setNextRoots([...roots, ref.current]);
  }, [roots]);

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
      if (
        bodyOverflowStyle !== 'hidden' &&
        !hidden &&
        restrictScroll &&
        trapFocus
      ) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };
  }, [bodyOverflowStyle, hidden, trapFocus, restrictScroll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hidden && trapFocus && roots && roots[0]) {
        roots.forEach(makeNodeUnfocusable);
      }
    }, 0);

    return () => {
      // remove trap and restore ability to focus on the last root only
      if (roots && roots[0]) makeNodeFocusable(roots[roots.length - 1]);
      clearTimeout(timer);
    };
  }, [hidden, roots, trapFocus]);

  return (
    <RootsContext.Provider value={nextRoots}>
      <div ref={ref} aria-hidden={hidden} {...rest}>
        {children}
      </div>
    </RootsContext.Provider>
  );
};
