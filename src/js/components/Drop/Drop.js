import React, { forwardRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer, setFocusWithoutScroll } from '../../utils';

import { DropContainer } from './DropContainer';

const Drop = forwardRef(
  (
    {
      restrictFocus,
      target: dropTarget, // avoid DOM leakage
      ...rest
    },
    ref,
  ) => {
    const originalFocusedElement = useMemo(() => document.activeElement, []);
    const dropContainer = useMemo(() => getNewContainer(), []);

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
        document.body.removeChild(dropContainer);
      },
      [dropContainer, originalFocusedElement, restrictFocus],
    );

    const portal = useMemo(
      () =>
        createPortal(
          <DropContainer
            ref={ref}
            dropTarget={dropTarget}
            restrictFocus={restrictFocus}
            {...rest}
          />,
          dropContainer,
        ),
      [dropContainer, dropTarget, ref, restrictFocus, rest],
    );

    return portal;
  },
);

Drop.displayName = 'Drop';

let DropDoc;
if (process.env.NODE_ENV !== 'production') {
  DropDoc = require('./doc').doc(Drop); // eslint-disable-line global-require
}
const DropWrapper = DropDoc || Drop;

export { DropWrapper as Drop };
