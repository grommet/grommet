import React, { forwardRef, useEffect, useState, useContext } from 'react';
import { createPortal } from 'react-dom';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { getNewContainer, setFocusWithoutScroll } from '../../utils';
import { DropContainer } from './DropContainer';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';

const Drop = forwardRef(
  (
    {
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
    useEffect(() => setDropContainer(getNewContainer(containerTarget)), [
      containerTarget,
    ]);

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

    return dropContainer
      ? createPortal(
          <DropContainer
            ref={ref}
            dir={theme && theme.dir}
            dropTarget={dropTarget}
            restrictFocus={restrictFocus}
            trapFocus={trapFocus}
            {...rest}
          />,
          dropContainer,
        )
      : null;
  },
);

Drop.displayName = 'Drop';

let DropDoc;
if (process.env.NODE_ENV !== 'production') {
  DropDoc = require('./doc').doc(Drop); // eslint-disable-line global-require
}
const DropWrapper = DropDoc || Drop;

export { DropWrapper as Drop };
