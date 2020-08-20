"use strict";

exports.__esModule = true;
exports.Drop = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _DropContainer = require("./DropContainer");

var _ContainerTargetContext = require("../../contexts/ContainerTargetContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Drop = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var restrictFocus = _ref.restrictFocus,
      dropTarget = _ref.target,
      _ref$trapFocus = _ref.trapFocus,
      trapFocus = _ref$trapFocus === void 0 ? true : _ref$trapFocus,
      rest = _objectWithoutPropertiesLoose(_ref, ["restrictFocus", "target", "trapFocus"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

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
  (0, _react.useEffect)(function () {
    return setDropContainer((0, _utils.getNewContainer)(containerTarget));
  }, [containerTarget]); // just a few things to clean up when the Drop is unmounted

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
  return dropContainer ? /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement(_DropContainer.DropContainer, _extends({
    ref: ref,
    dir: theme && theme.dir,
    dropTarget: dropTarget,
    restrictFocus: restrictFocus,
    trapFocus: trapFocus
  }, rest)), dropContainer) : null;
});
Drop.displayName = 'Drop';
var DropDoc;

if (process.env.NODE_ENV !== 'production') {
  DropDoc = require('./doc').doc(Drop); // eslint-disable-line global-require
}

var DropWrapper = DropDoc || Drop;
exports.Drop = DropWrapper;