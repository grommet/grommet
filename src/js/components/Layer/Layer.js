// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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

  // Keep the latest prop/state values available to the unmount-only
  // cleanup effect below without making it re-fire on every change to
  // them (see cleanupPropsRef usage).
  const cleanupPropsRef = useRef();
  cleanupPropsRef.current = {
    animate,
    animation,
    containerTarget,
    layerContainer,
    modal,
  };

  // just a few things to clean up when the Layer is unmounted.
  // Deps are intentionally empty so this only runs on unmount rather
  // than on every change to the values it reads, which would otherwise
  // tear down an open Layer whenever modal/animate/animation/
  // containerTarget changed.
  useLayoutEffect(
    () => () => {
      const {
        animate: cleanupAnimate,
        animation: cleanupAnimation,
        containerTarget: cleanupContainerTarget,
        layerContainer: cleanupLayerContainer,
        modal: cleanupModal,
      } = cleanupPropsRef.current;
      const originalFocusedElement = originalFocusedElementRef.current;
      if (originalFocusedElement) {
        // Restore focus if:
        // - modal layer (always restore), or
        // - non-modal layer that had focus when it closed
        const shouldRestoreFocus =
          cleanupModal || (!cleanupModal && focusWithinLayerRef.current);
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
      if (cleanupLayerContainer) {
        const activeAnimation =
          cleanupAnimation !== undefined ? cleanupAnimation : cleanupAnimate;
        if (activeAnimation !== false) {
          // undefined uses 'slide' as the default
          // animate out and remove later
          const layerClone = cleanupLayerContainer.cloneNode(true);
          layerClone.id = 'layerClone';
          cleanupContainerTarget.appendChild(layerClone);
          const clonedContainer = layerClone.querySelector(
            '[class*="StyledLayer__StyledContainer"]',
          );
          if (clonedContainer && clonedContainer.style) {
            clonedContainer.style.animationDirection = 'reverse';
          }
          setTimeout(() => {
            // we add the id and query here so the unit tests work
            const rootNode = cleanupContainerTarget.getRootNode();
            // Not all root nodes (ShadowRoot, DocumentFragment)
            //  have getElementById.
            if (rootNode && typeof rootNode.getElementById === 'function') {
              const clone = rootNode.getElementById('layerClone');
              if (clone) {
                if (cleanupContainerTarget.contains(clone)) {
                  cleanupContainerTarget.removeChild(clone);
                }
                cleanupLayerContainer.remove();
              }
            }
          }, animationDuration);
        } else if (cleanupContainerTarget.contains(cleanupLayerContainer)) {
          cleanupContainerTarget.removeChild(cleanupLayerContainer);
        }
      }
    },
    [],
  );

  return layerContainer
    ? createPortal(
        <LayerContainer ref={ref} {...props} modal={modal} />,
        layerContainer,
      )
    : null;
});

Layer.displayName = 'Layer';
Layer.propTypes = LayerPropTypes;

export { Layer };
