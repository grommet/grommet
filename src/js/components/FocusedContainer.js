import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  getBodyChildElements,
  makeNodeFocusable,
  makeNodeUnfocusable,
} from '../utils';
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

      // if an application doesn't use a <Grommet> wrapper, we search
      // the DOM to find FocusedContainer with data-g-id="grommet"
      getBodyChildElements()
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
    <div
      ref={ref}
      aria-hidden={hidden}
      // if a component relying on FocusedContainer is used in an
      // application that does not have a GrommetContext, we still
      // need a way to identify that this component is coming from
      // Grommet to control its aria-hidden value
      data-g-id={!bodyChildrenFromGrommet ? 'grommet' : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};
