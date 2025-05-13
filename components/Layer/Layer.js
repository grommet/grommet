"use strict";

exports.__esModule = true;
exports.Layer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _utils = require("../../utils");
var _LayerContainer = require("./LayerContainer");
var _StyledLayer = require("./StyledLayer");
var _ContainerTargetContext = require("../../contexts/ContainerTargetContext");
var _propTypes = require("./propTypes");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Layer = exports.Layer = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
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
  }, [containerTarget, targetChildPosition]);

  // just a few things to clean up when the Layer is unmounted
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
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
            var clone = containerTarget.getRootNode().getElementById('layerClone');
            if (clone) {
              if (containerTarget.contains(clone)) {
                containerTarget.removeChild(clone);
              }
              layerContainer.remove();
            }
          }, _StyledLayer.animationDuration);
        } else if (containerTarget.contains(layerContainer)) {
          containerTarget.removeChild(layerContainer);
        }
      }
    };
  }, [animate, animation, containerTarget, layerContainer, originalFocusedElement]);
  return layerContainer ? /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react["default"].createElement(_LayerContainer.LayerContainer, _extends({
    ref: ref
  }, props)), layerContainer) : null;
});
Layer.displayName = 'Layer';
Layer.propTypes = _propTypes.LayerPropTypes;