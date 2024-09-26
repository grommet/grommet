import React, { useEffect, useRef, useState } from 'react';

import { makeNodeFocusable, makeNodeUnfocusable } from '../utils';
import { RootsContext, useRoots } from '../contexts/RootsContext';

export const FocusedContainer = ({
  hidden = false,
  restrictScroll = false,
  children,
  trapFocus,
  ...rest
}) => {
  const [bodyOverflowStyle, setBodyOverflowStyle] = useState('');
  const ref = useRef(null);
  const preNodeRef = useRef(null);
  const postNodeRef = useRef(null);

  const { contextValue, hasRoots } = useRoots();
  const { roots: contextRoots } = contextValue;

  useEffect(() => {
    const container = ref.current;
    const roots = contextRoots.current;

    const handleTrapFocus = (e) => {
      if (
        !hidden &&
        trapFocus &&
        container &&
        // only perform focus if this is the most recently opened drop
        roots[roots.length - 1] === container
      ) {
        const focusableElements = container.querySelectorAll(
          `button:not([tabindex="-1"]), [href]:not([tabindex="-1"]), 
     input:not([tabindex="-1"]), select:not([tabindex="-1"]), 
     textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])`,
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (container.contains(e.target)) container.lastFocus = e.target;
        // if focus event is moving to bookend divs, loop focus to trap it.
        else if (
          container.lastFocus === firstElement &&
          (e.target === postNodeRef.current || e.target === preNodeRef.current)
        ) {
          lastElement.focus();
          e.preventDefault();
        } else if (
          e.target === postNodeRef.current ||
          e.target === preNodeRef.current
        ) {
          // In the case where the focus hasn't already been placed on
          // or within the container, this will ensure the next "tab"
          // places focus on the first focusable element
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const addListeners = () => {
      document.addEventListener('focus', handleTrapFocus, true);
    };

    const removeListeners = () => {
      document.removeEventListener('focus', handleTrapFocus, true);
    };

    // add container to the global roots
    if (container) roots.push(container);

    // Create and insert focusable nodes to help track when focus
    // has left this container but without letting focus be noticeably placed
    // on anything outside the container
    if (!hidden && trapFocus) {
      const preDiv = document.createElement('div');
      const postDiv = document.createElement('div');

      preNodeRef.current = container.parentNode.insertBefore(preDiv, container);
      postNodeRef.current = container.parentNode.insertBefore(
        postDiv,
        container.nextSibling,
      );
      preNodeRef.current.tabIndex = 0;
      postNodeRef.current.tabIndex = 0;
    }

    addListeners();

    return () => {
      // remove from global roots array
      if (roots.indexOf(container)) roots.splice(roots.indexOf(container), 1);
      removeListeners();
      if (roots?.[roots.length - 1]) makeNodeFocusable(roots[roots.length - 1]);
      preNodeRef?.current?.remove();
      postNodeRef?.current?.remove();
    };
  }, [hidden, contextRoots, trapFocus]);

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
    const roots = contextRoots.current;
    const timer = setTimeout(() => {
      if (!hidden && trapFocus && roots?.[0]) {
        // make every root before this one unfocusable
        roots.forEach((root, index) => {
          if (index < roots.length - 1) makeNodeUnfocusable(root);
        });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [hidden, contextRoots, trapFocus]);

  const focusedContainer = (
    <div ref={ref} aria-hidden={hidden} {...rest}>
      {children}
    </div>
  );

  if (hasRoots) return focusedContainer;
  return (
    // for cases outside of Grommet React tree, manage trapFocus when
    // Drop/Layer opens another Drop/Layer
    <RootsContext.Provider value={contextValue}>
      {focusedContainer}
    </RootsContext.Provider>
  );
};
