"use strict";

exports.__esModule = true;
exports.Layer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _utils = require("../../utils");

var _LayerContainer = require("./LayerContainer");

var _StyledLayer = require("./StyledLayer");

var _ContainerTargetContext = require("../../contexts/ContainerTargetContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Layer = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var animate = props.animate,
      animation = props.animation,
      targetChildPosition = props.targetChildPosition;

  var _useState = (0, _react.useState)(),
      originalFocusedElement = _useState[0],
      setOriginalFocusedElement = _useState[1];

  (0, _react.useEffect)(function () {
    return setOriginalFocusedElement(document.activeElement);
  }, []);

  var _useState2 = (0, _react.useState)(),
      layerContainer = _useState2[0],
      setLayerContainer = _useState2[1];

  var containerTarget = (0, _react.useContext)(_ContainerTargetContext.ContainerTargetContext);
  (0, _react.useEffect)(function () {
    return setLayerContainer((0, _utils.getNewContainer)(containerTarget, targetChildPosition));
  }, [containerTarget, targetChildPosition]); // just a few things to clean up when the Layer is unmounted

  (0, _react.useLayoutEffect)(function () {
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
          }, _StyledLayer.animationDuration);
        } else {
          containerTarget.removeChild(layerContainer);
        }
      }
    };
  }, [animate, animation, containerTarget, layerContainer, originalFocusedElement]);
  return layerContainer ? /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement(_LayerContainer.LayerContainer, _extends({
    ref: ref
  }, props)), layerContainer) : null;
});
Layer.displayName = 'Layer';
var LayerDoc;

if (process.env.NODE_ENV !== 'production') {
  LayerDoc = require('./doc').doc(Layer); // eslint-disable-line global-require
}

var LayerWrapper = LayerDoc || Layer;
exports.Layer = LayerWrapper;