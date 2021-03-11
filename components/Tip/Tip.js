"use strict";

exports.__esModule = true;
exports.Tip = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Box = require("../Box");

var _Drop = require("../Drop");

var _refs = require("../../utils/refs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Tip = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, tipRef) {
  var children = _ref.children,
      content = _ref.content,
      dropProps = _ref.dropProps,
      plain = _ref.plain;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);

  var _useState = (0, _react.useState)(false),
      over = _useState[0],
      setOver = _useState[1];

  var componentRef = (0, _refs.useForwardedRef)(tipRef); // In cases the child is a primitive

  var wrapInvalidElement = function wrapInvalidElement() {
    return (// Handle the use case of a primitive string child
      // so we'll be able to assign ref and events on the child.
      ! /*#__PURE__*/_react["default"].isValidElement(children) ? /*#__PURE__*/_react["default"].createElement("span", null, children) : children
    );
  };
  /* Three use case for children
    1. Tip has a single child + it is a React Element => Great!
    2. Tip has a single child +  not React Element => span will wrap the child.
    3. Tip has more than one child => Abort, display Children.only error 
  */


  var child = _react.Children.count(children) === 1 ? wrapInvalidElement() : _react.Children.only(children);
  var clonedChild = /*#__PURE__*/(0, _react.cloneElement)(child, {
    onMouseEnter: function onMouseEnter() {
      return setOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setOver(false);
    },
    onFocus: function onFocus() {
      return setOver(true);
    },
    onBlur: function onBlur() {
      return setOver(false);
    },
    key: 'tip-child',
    ref: function ref(node) {
      // https://github.com/facebook/react/issues/8873#issuecomment-287873307
      if (typeof componentRef === 'function') {
        componentRef(node);
      } else if (componentRef) {
        // eslint-disable-next-line no-param-reassign
        componentRef.current = node;
      } // Call the original ref, if any


      var callerRef = child.ref;

      if (typeof callerRef === 'function') {
        callerRef(node);
      } else if (callerRef) {
        callerRef.current = node;
      }
    }
  });
  return [clonedChild, over && /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
    target: componentRef.current,
    trapFocus: false,
    key: "tip-drop"
  }, theme.tip.drop, dropProps), plain ? content : /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.tip.content, content))];
});
Tip.displayName = 'Tip';
var TipDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TipDoc = require('./doc').doc(Tip);
}

var TipWrapper = TipDoc || Tip;
exports.Tip = TipWrapper;