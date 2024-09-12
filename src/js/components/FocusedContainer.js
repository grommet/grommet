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
    if (ref.current) {
      setNextRoots([...roots, ref.current]);
    }
  }, [roots]);

  // Manage body overflow to restrict scrolling
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

  const trapFocusHandler = (event) => {
    const container = ref.current;
    if (!container) return;

    // Find all focusable elements within the container
    const focusableElements = container.querySelectorAll(
      `button, [href], input, select, textarea,
       [tabindex]:not([tabindex="-1"])`,
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      if (lastElement) lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      if (firstElement) firstElement.focus();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hidden && trapFocus && nextRoots && nextRoots.length > 0) {
        // Make all nodes unfocusable except the last one in the list
        roots.forEach(makeNodeUnfocusable);
        document.addEventListener('keydown', trapFocusHandler, true);
      }
    }, 0);

    return () => {
      document.removeEventListener('keydown', trapFocusHandler, true);
      // Restore focusability when component is unmounted or updated
      clearTimeout(timer);
      if (roots && roots.length > 0) {
        makeNodeFocusable(roots[roots.length - 1]);
      }
    };
  }, [hidden, nextRoots, trapFocus, roots]);

  return (
    <RootsContext.Provider value={nextRoots}>
      <div ref={ref} aria-hidden={hidden} {...rest}>
        {children}
      </div>
    </RootsContext.Provider>
  );
};
