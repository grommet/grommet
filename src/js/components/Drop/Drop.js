import React, {
  forwardRef,
  useEffect,
  useState,
  useContext,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { getNewContainer, setFocusWithoutScroll } from '../../utils';
import { DropContainer } from './DropContainer';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
import { DropPropTypes } from './propTypes';

const Drop = forwardRef(
  (
    {
      inline,
      restrictFocus,
      target: dropTarget, // avoid DOM leakage
      trapFocus = true,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [originalFocusedElement, setOriginalFocusedElement] = useState();
    useEffect(() => setOriginalFocusedElement(document.activeElement), []);
    const [dropContainer, setDropContainer] = useState();
    const containerTarget = useContext(ContainerTargetContext);
    const containerChildNodesLength = useRef(null);
    useEffect(() => {
      // we need this condition to prevent getNewContainer to run multiple times
      // in the event that the component gets created, destroyed, and recreated.
      // see https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
      if (!containerChildNodesLength?.current) {
        containerChildNodesLength.current = containerTarget.childNodes.length;
        setDropContainer(
          !inline ? getNewContainer(containerTarget) : undefined,
        );
      }
    }, [containerTarget, inline]);

    // just a few things to clean up when the Drop is unmounted
    useEffect(
      () => () => {
        if (restrictFocus && originalFocusedElement) {
          if (originalFocusedElement.focus) {
            setFocusWithoutScroll(originalFocusedElement);
          } else if (
            originalFocusedElement.parentNode &&
            originalFocusedElement.parentNode.focus
          ) {
            // required for IE11 and Edge
            setFocusWithoutScroll(originalFocusedElement.parentNode);
          }
        }
        if (dropContainer) {
          containerTarget.removeChild(dropContainer);
        }
      },
      [containerTarget, dropContainer, originalFocusedElement, restrictFocus],
    );

    const content = (
      <DropContainer
        ref={ref}
        dir={theme && theme.dir}
        dropTarget={dropTarget}
        restrictFocus={restrictFocus}
        trapFocus={trapFocus}
        {...rest}
      />
    );

    if (inline) return content;

    if (dropContainer) return createPortal(content, dropContainer);

    return null;
  },
);

Drop.displayName = 'Drop';
Drop.propTypes = DropPropTypes;

export { Drop };
