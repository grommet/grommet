import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer } from '../../utils';

import { LayerContainer } from './LayerContainer';
import { animationDuration } from './StyledLayer';

const useLayerContainer = ({ animate, animation }) => {
  const [layerContainer, setLayerContainer] = useState(null);

  useEffect(() => {
    const container = getNewContainer();
    const originalFocusedElement = document.activeElement;

    setLayerContainer(container);

    return () => {
      setLayerContainer(null);

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
        const layerClone = container.cloneNode(true);

        layerClone.id = 'layerClone';
        document.body.appendChild(layerClone);

        const clonedContainer = layerClone.querySelector(
          '[class*="StyledLayer__StyledContainer"]',
        );
        if (clonedContainer && clonedContainer.style) {
          clonedContainer.style.animationDirection = 'reverse';
        }
        setTimeout(() => {
          // we add the id and query here so the unit tests work
          const clone = document.getElementById('layerClone');

          if (clone) document.body.removeChild(clone);
        }, animationDuration);
      }
    };
  }, [animate, animation]);

  return layerContainer;
};

const Layer = props => {
  const layerContainer = useLayerContainer(props);

  return layerContainer
    ? createPortal(<LayerContainer {...props} />, layerContainer)
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
