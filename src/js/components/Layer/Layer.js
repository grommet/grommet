import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer } from '../../utils';

import { LayerContainer } from './LayerContainer';
import { animationDuration } from './StyledLayer';

const Layer = props => {
  const { animate, animation } = props;

  const [isLayerContainerAvailable, setIsLayerContainerAvailable] = useState(
    false,
  );

  const originalFocusedElementRef = useRef();
  const layerContainerRef = useRef();

  useEffect(() => {
    // ensure document is available
    originalFocusedElementRef.current = document.activeElement;
    layerContainerRef.current = getNewContainer();
    setIsLayerContainerAvailable(true);

    return () => {
      const originalFocusedElement = originalFocusedElementRef.current;

      if (originalFocusedElement) {
        if (originalFocusedElement.focus) {
          // wait for the fixed positioning to come back to normal
          // see layer styling for reference
          setTimeout(() => {
            originalFocusedElement.focus();
          }, 0);
        } else if (
          originalFocusedElement.parentNode &&
          originalFocusedElement.parentNode.focus
        ) {
          // required for IE11 and Edge
          originalFocusedElement.parentNode.focus();
        }
      }

      const activeAnimation = animation !== undefined ? animation : animate;
      if (activeAnimation !== false) {
        // undefined uses 'slide' as the default
        // animate out and remove later
        const layerClone = layerContainerRef.current.cloneNode(true);
        layerClone.id = 'layerClone';
        document.body.appendChild(layerClone);
        const clonedContainer = layerClone.querySelector(
          '[class*="StyledLayer__StyledContainer"]',
        );
        clonedContainer.style.animationDirection = 'reverse';
        setTimeout(() => {
          // we add the id and query here so the unit tests work
          const clone = document.getElementById('layerClone');
          if (clone) document.body.removeChild(clone);
        }, animationDuration);
      }
    };
  }, [animation, animate]);

  return isLayerContainerAvailable
    ? createPortal(<LayerContainer {...props} />, layerContainerRef.current)
    : null;
};

Layer.defaultProps = {
  full: false,
  margin: 'none',
  modal: true,
  position: 'center',
  responsive: true,
};

let LayerDoc;
if (process.env.NODE_ENV !== 'production') {
  LayerDoc = require('./doc').doc(Layer); // eslint-disable-line global-require
}
const LayerWrapper = LayerDoc || Layer;

export { LayerWrapper as Layer };
