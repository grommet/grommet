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

  const isFocusable = (element) => {
    if (element.tabIndex < 0) {
      return false;
    }

    if (element.disabled) {
      return false;
    }

    switch (element.nodeName) {
      case 'A':
        return !!element.href && element.rel != 'ignore';
      case 'INPUT':
        return element.type != 'hidden';
      case 'BUTTON':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
      default:
        return false;
    }
  };
  let IgnoreUtilFocusChanges = false;

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

  const focusLastDescendant = (element) => {
    for (let i = element.childNodes.length - 1; i >= 0; i--) {
      const child = element.childNodes[i];
      if (attemptFocus(child) || focusLastDescendant(child)) {
        return true;
      }
    }
    return false;
  };
  const focusFirstDescendant = (element) => {
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i];
      if (attemptFocus(child) || focusFirstDescendant(child)) {
        return true;
      }
    }
    return false;
  };

  const attemptFocus = (element) => {
    if (!isFocusable(element)) {
      return false;
    }

    IgnoreUtilFocusChanges = true;
    try {
      element.focus();
    } catch (e) {
      // Continue regardless of error
    }
    IgnoreUtilFocusChanges = false;

    return document.activeElement === element;
  };

  const trapFocusHandler = useCallback(
    (event) => {
      if (nextRoots && nextRoots.length > 0) {
        if (IgnoreUtilFocusChanges) {
          return;
        }

        // Get the last dialog in the array
        const lastCurrentDialog = nextRoots[nextRoots.length - 1];
        const currentDialog = {
          dialogNode: lastCurrentDialog.querySelector('div'),
          lastFocus: null,
        };
        console.log('?', currentDialog.dialogNode);
        // currentDialog.lastFocus is sometimes null
        // when the dialog is first opened also looks like
        // its null when you try and get the last focusable element from the first focusable element
        // backwards

        if (currentDialog.dialogNode) {
          if (currentDialog.dialogNode.contains(event.target)) {
            currentDialog.lastFocus = event.target;
            // console.log(currentDialog.lastFocus);
          } else {
            focusFirstDescendant(currentDialog.dialogNode);
            if (currentDialog.lastFocus == document.activeElement) {
              // console.log('second', currentDialog.lastFocus);
              focusLastDescendant(currentDialog.dialogNode);
            }
            currentDialog.lastFocus = document.activeElement;
          }
        }
      }
    },
    [nextRoots],
  );

  useEffect(() => {
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

    return () => {
      document.removeEventListener('focus', trapFocusHandler, true);
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
