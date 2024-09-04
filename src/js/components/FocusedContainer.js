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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hidden && trapFocus && nextRoots && nextRoots.length > 0) {
        // Make all nodes unfocusable except the last one in the list
        roots.forEach(makeNodeUnfocusable);

        // Access the last parent <div> in nextRoots
        const lastParentDiv = nextRoots[nextRoots.length - 1];

        if (lastParentDiv && lastParentDiv instanceof Element) {
          // Find a specific child <div> inside the last parent <div>
          const childDiv = lastParentDiv.querySelector('div');

          if (childDiv) {
            // Find all focusable elements within the child <div>
            const focusableElements = childDiv.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );

            // Get the first and last focusable elements
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // tab key press handler
            const handleTabKeyPress = (event) => {
              if (event.key === 'Tab') {
                if (event.shiftKey && document.activeElement === firstElement) {
                  event.preventDefault();
                  if (lastElement) {
                    lastElement.focus();
                  }
                } else if (
                  !event.shiftKey &&
                  document.activeElement === lastElement
                ) {
                  event.preventDefault();
                  if (firstElement) {
                    firstElement.focus();
                  }
                }
              }
            };

            // Attach the event listener for tab key press
            document.addEventListener('keydown', handleTabKeyPress);

            // Automatically focus on the first focusable element
            // should we do this or take out?
            if (firstElement) {
              firstElement.focus();
              console.log(
                'Automatically focused on the first element:',
                firstElement,
              );
            }

            // Cleanup function to remove the event listener
            return () => {
              document.removeEventListener('keydown', handleTabKeyPress);
            };
          }
        }
      }
    }, 0);

    return () => {
      // Restore focusability when component is unmounted or updated
      if (roots && roots.length > 0) {
        makeNodeFocusable(roots[roots.length - 1]);
      }
      clearTimeout(timer);
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
