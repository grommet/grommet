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
  const preNodeRef = useRef(null);
  const postNodeRef = useRef(null);

  const { roots, setRoots } = useContext(RootsContext);
  const [active, setActive] = useState(true);

  // only the most recent container in roots should be active and listening
  // for focus events. when active is false, event listeners will be removed
  useEffect(() => {
    if (ref.current && roots[roots.length - 1] === ref.current) {
      setActive(true);
    } else setActive(false);
  }, [roots]);

  useEffect(() => {
    const container = ref.current;
    if (container) {
      // avoid infinite loop by only adding it if it's not already there
      const nextRoots = !roots.includes(container)
        ? [...roots, container]
        : roots;
      setRoots(nextRoots);
    }
    // on unmount, remove this container from roots
    return () => {
      const nextRoots = [...roots.filter((root) => root !== container)];
      setRoots(nextRoots);
      // ensure ability to focus is restored to what will now be the
      // top-most container
      makeNodeFocusable(nextRoots[nextRoots.length - 1]);
    };
  }, [roots, setRoots]);

  useEffect(() => {
    const handleTrapFocus = (e) => {
      const container = ref.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll(
        `button, [href], input, select, textarea,
         [tabindex]:not([tabindex="-1"])`,
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (container.contains(e.target)) {
        container.lastFocus = e.target;
      } else if (container.lastFocus === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else {
        // In the case where the focus hasn't already been placed on or within
        // the container, this will ensure the next "tab" places focus on the
        // first focusable element
        firstElement.focus();
        e.preventDefault();
      }
    };

    const addListeners = () => {
      document.addEventListener('focus', handleTrapFocus, {
        capture: true,
        passive: false,
      });
    };

    const removeListeners = () => {
      document.removeEventListener('focus', handleTrapFocus, {
        capture: true,
        passive: false,
      });
    };

    // Create and insert focusable nodes to help track when focus
    // has left this container but without letting focus be noticeably placed
    // on anything outside the container
    const preDiv = document.createElement('div');
    const postDiv = document.createElement('div');

    preNodeRef.current = ref.current.parentNode.insertBefore(
      preDiv,
      ref.current,
    );
    postNodeRef.current = ref.current.parentNode.insertBefore(
      postDiv,
      ref.current.nextSibling,
    );
    preNodeRef.current.tabIndex = 0;
    postNodeRef.current.tabIndex = 0;

    if (!active) {
      console.log(`remove event listener`);
      removeListeners();
    } else {
      addListeners();
      console.log(`add event listener`);
    }

    return () => {
      removeListeners();
      preNodeRef.current.remove();
      postNodeRef.current.remove();
    };
  }, [active, roots]);

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
        // make every root before this one unfocusable
        roots.forEach((root, index) => {
          if (index < roots.length - 1) makeNodeUnfocusable(root);
        });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [hidden, roots, trapFocus]);

  return (
    <div ref={ref} aria-hidden={hidden} {...rest}>
      {children}
    </div>
  );
};
