import React, { useEffect, useRef, useState } from 'react';

import { makeNodeFocusable, makeNodeUnfocusable } from '../utils';
import { RootsContext, useRoots } from '../contexts/RootsContext';

const isFocusable = (element) => {
  if (element?.tabIndex < 0 || element?.disabled) {
    return false;
  }
  switch (element?.nodeName) {
    case 'A':
      return !!element.href && element.rel !== 'ignore';
    case 'INPUT':
      return element.type !== 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    case 'DIV':
      return element.tabIndex >= 0;
    default:
      return false;
  }
};

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
  // When attemptFocus moves focus around to find the focusable element,
  // set this to true so handleTrapFocus doesn't focus the element.
  const ignoreUtilFocusRef = useRef(false);
  const lastFocusRef = useRef(null);

  useEffect(() => {
    const container = ref.current;
    const roots = contextRoots.current;

    const attemptFocus = (element) => {
      // Check if the element is focusable; if not, return false
      if (!isFocusable(element)) {
        return false;
      }
      ignoreUtilFocusRef.current = true;
      try {
        element.focus();
      } catch (e) {
        // continue regardless of error
      }
      ignoreUtilFocusRef.current = false;
      // Return true if the element is currently the active element or has focus
      return document.activeElement === element;
    };

    const focusFirstDescendant = (element) => {
      // Iterate through all child nodes of the provided element
      for (let i = 0; i < element.childNodes.length; i += 1) {
        const child = element.childNodes[i];
        if (attemptFocus(child) || focusFirstDescendant(child)) return true;
      }
      // If no focusable child or descendant was found, return false
      return false;
    };

    const focusLastDescendant = (element) => {
      for (let i = element.childNodes.length - 1; i >= 0; i -= 1) {
        const child = element.childNodes[i];
        if (attemptFocus(child) || focusLastDescendant(child)) return true;
      }
      return false;
    };

    const handleTrapFocus = (e) => {
      if (
        !hidden &&
        trapFocus &&
        ignoreUtilFocusRef.current === false &&
        container &&
        // only perform focus if this is the most recently opened drop
        roots[roots.length - 1] === container
      ) {
        if (container.contains(e.target)) {
          lastFocusRef.current = e.target;
        } else {
          focusFirstDescendant(container);
          if (lastFocusRef.current === document.activeElement) {
            focusLastDescendant(container);
          }
          lastFocusRef.current = document.activeElement;
        }
      }
    };

    // add container to the global roots
    if (container) roots.push(container);

    // Create and insert focusable nodes to help track when focus
    // has left this container but without letting focus be noticeably
    // placed on anything outside the container
    if (!hidden && trapFocus) {
      const preDiv = document.createElement('div');
      const postDiv = document.createElement('div');

      const commonStyles = {
        position: 'absolute',
        height: '1px',
        left: '0',
        right: '0',
      };

      Object.assign(preDiv.style, {
        ...commonStyles,
        top: '0',
      });

      Object.assign(postDiv.style, {
        ...commonStyles,
        bottom: '0',
      });

      preNodeRef.current = container.parentNode.insertBefore(preDiv, container);
      postNodeRef.current = container.parentNode.insertBefore(
        postDiv,
        container.nextSibling,
      );
      preNodeRef.current.tabIndex = 0;
      postNodeRef.current.tabIndex = 0;
    }

    document.addEventListener('focus', handleTrapFocus, true);

    return () => {
      // remove from global roots array
      if (roots.includes(container)) roots.splice(roots.indexOf(container), 1);
      document.removeEventListener('focus', handleTrapFocus, true);
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
      if (!hidden && trapFocus) {
        // make every root before this one unfocusable
        roots?.forEach((root, index) => {
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
