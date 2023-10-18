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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  return layerContainer ? /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement(_LayerContainer.LayerContainer, _extends({
    ref: ref
  }, props)), layerContainer) : null;
});
Layer.displayName = 'Layer';
Layer.propTypes = _propTypes.LayerPropTypes;