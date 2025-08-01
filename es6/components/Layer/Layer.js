function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { getNewContainer } from '../../utils';
import { LayerContainer } from './LayerContainer';
import { animationDuration } from './StyledLayer';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
import { LayerPropTypes } from './propTypes';
var Layer = /*#__PURE__*/forwardRef(function (props, ref) {
  var animate = props.animate,
    animation = props.animation,
    _props$modal = props.modal,
    modal = _props$modal === void 0 ? true : _props$modal,
    targetChildPosition = props.targetChildPosition;
  var _useState = useState(),
    layerContainer = _useState[0],
    setLayerContainer = _useState[1];
  var containerTarget = useContext(ContainerTargetContext);
  var originalFocusedElementRef = useRef(null);
  var focusWithinLayerRef = useRef(false);
  useEffect(function () {
    originalFocusedElementRef.current = document.activeElement;
  }, []);
  useEffect(function () {
    var handleFocusIn = function handleFocusIn(event) {
      if (layerContainer != null && layerContainer.contains != null && layerContainer.contains(event.target)) {
        focusWithinLayerRef.current = true;
      }
    };
    var handleFocusOut = function handleFocusOut(event) {
      if (layerContainer != null && layerContainer.contains != null && layerContainer.contains(event.target) && !layerContainer.contains(event.relatedTarget)) {
        focusWithinLayerRef.current = false;
      }
    };
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    return function () {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [layerContainer]);
  useEffect(function () {
    return setLayerContainer(getNewContainer(containerTarget, targetChildPosition));
  }, [containerTarget, targetChildPosition]);
  // just a few things to clean up when the Layer is unmounted
  useLayoutEffect(function () {
    return function () {
      var originalFocusedElement = originalFocusedElementRef.current;
      if (originalFocusedElement) {
        // Restore focus if:
        // - modal layer (always restore), or
        // - non-modal layer that had focus when it closed
        var shouldRestoreFocus = modal || !modal && focusWithinLayerRef.current;
        if (shouldRestoreFocus && originalFocusedElement.focus) {
          // wait for the fixed positioning to come back to normal
          // see layer styling for reference
          setTimeout(function () {
            return originalFocusedElement.focus();
          }, 0);
        } else if (originalFocusedElement.parentNode && originalFocusedElement.parentNode.focus) {
          // required for IE11 and Edge
          originalFocusedElement.parentNode.focus();
        }
      }
      if (layerContainer) {
        var activeAnimation = animation !== undefined ? animation : animate;
        if (activeAnimation !== false) {
          // undefined uses 'slide' as the default
          // animate out and remove later
          var layerClone = layerContainer.cloneNode(true);
          layerClone.id = 'layerClone';
          containerTarget.appendChild(layerClone);
          var clonedContainer = layerClone.querySelector('[class*="StyledLayer__StyledContainer"]');
          if (clonedContainer && clonedContainer.style) {
            clonedContainer.style.animationDirection = 'reverse';
          }
          setTimeout(function () {
            // we add the id and query here so the unit tests work
            var rootNode = containerTarget.getRootNode();
            // Not all root nodes (ShadowRoot, DocumentFragment)
            //  have getElementById.
            if (rootNode && typeof rootNode.getElementById === 'function') {
              var clone = rootNode.getElementById('layerClone');
              if (clone) {
                if (containerTarget.contains(clone)) {
                  containerTarget.removeChild(clone);
                }
                layerContainer.remove();
              }
            }
          }, animationDuration);
        } else if (containerTarget.contains(layerContainer)) {
          containerTarget.removeChild(layerContainer);
        }
      }
    };
  }, [animate, animation, containerTarget, layerContainer, modal]);
  return layerContainer ? /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement(LayerContainer, _extends({
    ref: ref
  }, props, {
    modal: modal
  })), layerContainer) : null;
});
Layer.displayName = 'Layer';
Layer.propTypes = LayerPropTypes;
export { Layer };