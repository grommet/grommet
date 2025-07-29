import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { getNewContainer } from '../../utils';

import { LayerContainer } from './LayerContainer';
import { animationDuration } from './StyledLayer';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
import { LayerPropTypes } from './propTypes';

const Layer = forwardRef((props, ref) => {
  const { animate, animation, modal = true, targetChildPosition } = props;
  const [layerContainer, setLayerContainer] = useState();
  const containerTarget = useContext(ContainerTargetContext);

  const originalFocusedElementRef = useRef(null);

  const focusWithinLayerRef = useRef(false);

  useEffect(() => {
    originalFocusedElementRef.current = document.activeElement;
  }, []);

  useEffect(() => {
    const handleFocusIn = (event) => {
      if (layerContainer?.contains?.(event.target)) {
        focusWithinLayerRef.current = true;
      }
    };
    const handleFocusOut = (event) => {
      if (
        layerContainer?.contains?.(event.target) &&
        !layerContainer.contains(event.relatedTarget)
      ) {
        focusWithinLayerRef.current = false;
      }
    };
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [layerContainer]);

  useEffect(
    () =>
      setLayerContainer(getNewContainer(containerTarget, targetChildPosition)),
    [containerTarget, targetChildPosition],
  );
  // just a few things to clean up when the Layer is unmounted
  useLayoutEffect(
    () => () => {
      const originalFocusedElement = originalFocusedElementRef.current;
      if (originalFocusedElement) {
        // Restore focus if:
        // - modal layer (always restore), or
        // - non-modal layer that had focus when it closed
        const shouldRestoreFocus =
          modal || (!modal && focusWithinLayerRef.current);
        if (shouldRestoreFocus && originalFocusedElement.focus) {
          // wait for the fixed positioning to come back to normal
          // see layer styling for reference
          setTimeout(() => originalFocusedElement.focus(), 0);
        } else if (
          originalFocusedElement.parentNode &&
          originalFocusedElement.parentNode.focus
        ) {
          // required for IE11 and Edge
          originalFocusedElement.parentNode.focus();
        }
      }
      if (layerContainer) {
        const activeAnimation = animation !== undefined ? animation : animate;
        if (activeAnimation !== false) {
          // undefined uses 'slide' as the default
          // animate out and remove later
          const layerClone = layerContainer.cloneNode(true);
          layerClone.id = 'layerClone';
          containerTarget.appendChild(layerClone);
          const clonedContainer = layerClone.querySelector(
            '[class*="StyledLayer__StyledContainer"]',
          );
          if (clonedContainer && clonedContainer.style) {
            clonedContainer.style.animationDirection = 'reverse';
          }
          setTimeout(() => {
            // we add the id and query here so the unit tests work
            const clone = containerTarget
              .getRootNode()
              .getElementById('layerClone');
            if (clone) {
              if (containerTarget.contains(clone)) {
                containerTarget.removeChild(clone);
              }
              layerContainer.remove();
            }
          }, animationDuration);
        } else if (containerTarget.contains(layerContainer)) {
          containerTarget.removeChild(layerContainer);
        }
      }
    },
    [animate, animation, containerTarget, layerContainer, modal],
  );

  return layerContainer
    ? createPortal(<LayerContainer ref={ref} {...props} />, layerContainer)
    : null;
});

Layer.displayName = 'Layer';
Layer.propTypes = LayerPropTypes;

export { Layer };
