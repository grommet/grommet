"use strict";

exports.__esModule = true;
exports.Drop = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _utils = require("../../utils");
var _DropContainer = require("./DropContainer");
var _ContainerTargetContext = require("../../contexts/ContainerTargetContext");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["inline", "restrictFocus", "target", "trapFocus"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Drop = exports.Drop = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var inline = _ref.inline,
    restrictFocus = _ref.restrictFocus,
    dropTarget = _ref.target,
    _ref$trapFocus = _ref.trapFocus,
    trapFocus = _ref$trapFocus === void 0 ? true : _ref$trapFocus,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState = (0, _react.useState)(),
    originalFocusedElement = _useState[0],
    setOriginalFocusedElement = _useState[1];
  (0, _react.useEffect)(function () {
    return setOriginalFocusedElement(document.activeElement);
  }, []);
  var _useState2 = (0, _react.useState)(),
    dropContainer = _useState2[0],
    setDropContainer = _useState2[1];
  var containerTarget = (0, _react.useContext)(_ContainerTargetContext.ContainerTargetContext);
  var containerChildNodesLength = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    // we need this condition to prevent getNewContainer to run multiple times
    // in the event that the component gets created, destroyed, and recreated.
    // see https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
    if (!(containerChildNodesLength != null && containerChildNodesLength.current)) {
      containerChildNodesLength.current = containerTarget.childNodes.length;
      setDropContainer(!inline ? (0, _utils.getNewContainer)(containerTarget) : undefined);
    }
  }, [containerTarget, inline]);

  // just a few things to clean up when the Drop is unmounted
  (0, _react.useEffect)(function () {
    return function () {
      if (restrictFocus && originalFocusedElement) {
        if (originalFocusedElement.focus) {
          (0, _utils.setFocusWithoutScroll)(originalFocusedElement);
        } else if (originalFocusedElement.parentNode && originalFocusedElement.parentNode.focus) {
          // required for IE11 and Edge
          (0, _utils.setFocusWithoutScroll)(originalFocusedElement.parentNode);
        }
      }
      if (dropContainer) {
        containerTarget.removeChild(dropContainer);
      }
    };
  }, [containerTarget, dropContainer, originalFocusedElement, restrictFocus]);
  var content = /*#__PURE__*/_react["default"].createElement(_DropContainer.DropContainer, _extends({
    ref: ref,
    dir: theme && theme.dir,
    dropTarget: dropTarget,
    restrictFocus: restrictFocus,
    trapFocus: trapFocus
  }, rest));
  if (inline) return content;
  if (dropContainer) return /*#__PURE__*/(0, _reactDom.createPortal)(content, dropContainer);
  return null;
});
Drop.displayName = 'Drop';
Drop.propTypes = _propTypes.DropPropTypes;