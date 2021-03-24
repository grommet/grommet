function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getNewContainer } from '../../utils';
import { LayerContainer } from './LayerContainer';
import { animationDuration } from './StyledLayer';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
var Layer = /*#__PURE__*/forwardRef(function (props, ref) {
  var animate = props.animate,
      animation = props.animation,
      targetChildPosition = props.targetChildPosition;

  var _useState = useState(),
      originalFocusedElement = _useState[0],
      setOriginalFocusedElement = _useState[1];

  useEffect(function () {
    return setOriginalFocusedElement(document.activeElement);
  }, []);

  var _useState2 = useState(),
      layerContainer = _useState2[0],
      setLayerContainer = _useState2[1];

  var containerTarget = useContext(ContainerTargetContext);
  useEffect(function () {
    return setLayerContainer(getNewContainer(containerTarget, targetChildPosition));
  }, [containerTarget, targetChildPosition]); // just a few things to clean up when the Layer is unmounted

  useLayoutEffect(function () {
    return function () {
      if (originalFocusedElement) {
        if (originalFocusedElement.focus) {
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
            var clone = document.getElementById('layerClone');

            if (clone) {
              containerTarget.removeChild(clone);
              layerContainer.remove();
            }
          }, animationDuration);
        } else {
          containerTarget.removeChild(layerContainer);
        }
      }
    };
  }, [animate, animation, containerTarget, layerContainer, originalFocusedElement]);
  return layerContainer ? /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement(LayerContainer, _extends({
    ref: ref
  }, props)), layerContainer) : null;
});
Layer.displayName = 'Layer';
var LayerDoc;

if (process.env.NODE_ENV !== 'production') {
  LayerDoc = require('./doc').doc(Layer); // eslint-disable-line global-require
}

var LayerWrapper = LayerDoc || Layer;
export { LayerWrapper as Layer };