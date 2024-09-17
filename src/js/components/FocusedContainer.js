import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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

  const trapFocusHandler = useCallback((event) => {
    const container = ref.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      `button, [href], input, select, textarea,
       [tabindex]:not([tabindex="-1"])`,
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (container.contains(event.target)) {
      container.lastFocus = event.target;
    } else if (container.lastFocus === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else {
      firstElement.focus();
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hidden && trapFocus && roots && roots[0]) {
        document.addEventListener('focus', trapFocusHandler, true);
        // Create and insert focusable nodes
        const preDiv = document.createElement('div');
        const postDiv = document.createElement('div');

        preDiv.tabIndex = 0;
        postDiv.tabIndex = 0;

        preNodeRef.current = ref.current.parentNode.insertBefore(
          preDiv,
          ref.current,
        );
        postNodeRef.current = ref.current.parentNode.insertBefore(
          postDiv,
          ref.current.nextSibling,
        );

        // Make all nodes unfocusable except the last one in the list
        roots.forEach(makeNodeUnfocusable);
      }
    }, 0);

    return () => {
      document.removeEventListener('focus', trapFocusHandler, true);
      clearTimeout(timer);
      if (preNodeRef.current) preNodeRef.current.remove();
      if (postNodeRef.current) postNodeRef.current.remove();

      if (roots && roots[0]) {
        makeNodeFocusable(roots[roots.length - 1]);
      }
    };
  }, [hidden, trapFocus, roots, trapFocusHandler]);

  return (
    <RootsContext.Provider value={nextRoots}>
      <div ref={ref} aria-hidden={hidden} {...rest}>
        {children}
      </div>
    </RootsContext.Provider>
  );
};
