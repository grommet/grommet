import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer, setFocusWithoutScroll } from '../../utils';

import { DropContainer } from './DropContainer';

const Drop = props => {
  const originalFocusedElement = document.activeElement;

  const dropContainer = getNewContainer();

  useEffect(() => {
    return () => {
      const { restrictFocus } = props;
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
    };
  });

  const {
    target: dropTarget, // avoid DOM leakage
    ...rest
  } = props;
  return createPortal(
    <DropContainer dropTarget={dropTarget} {...rest} />,
    dropContainer,
  );
};

Drop.defaultProps = {
  align: {
    top: 'top',
    left: 'left',
  },
  plain: false,
};

let DropDoc;
if (process.env.NODE_ENV !== 'production') {
  DropDoc = require('./doc').doc(Drop); // eslint-disable-line global-require
}
const DropWrapper = DropDoc || Drop;

export { DropWrapper as Drop };
