"use strict";

exports.__esModule = true;
exports.Tip = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Drop = require("../Drop");
var _Keyboard = require("../Keyboard");
var _utils = require("../../utils");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/*
 * This function getReactNodeRef is adapted from
 * [Material UI] (https://github.com/mui/material-ui)
 * Licensed under the MIT License (c) 2024 aarongarciah
 * The function has been modified from its original version.
 */
var getReactNodeRef = function getReactNodeRef(element) {
  if (!element || ! /*#__PURE__*/_react["default"].isValidElement(element)) {
    return null;
  }

  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to
  // children in older versions
  return {}.propertyIsEnumerable.call(element.props, 'ref') ? element.props.ref : element.ref;
};
var Tip = exports.Tip = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, tipRef) {
  var children = _ref.children,
    content = _ref.content,
    _ref$defaultVisible = _ref.defaultVisible,
    defaultVisible = _ref$defaultVisible === void 0 ? false : _ref$defaultVisible,
    dropProps = _ref.dropProps,
    plain = _ref.plain;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState = (0, _react.useState)(false),
    over = _useState[0],
    setOver = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    tooltipOver = _useState2[0],
    setTooltipOver = _useState2[1];
  var usingKeyboard = (0, _utils.useKeyboard)();
  var componentRef = (0, _utils.useForwardedRef)(tipRef);

  // Three use case for children
  // 1. Tip has a single child + it is a React Element => Great!
  // 2. Tip has a single child +  not React Element =>
  // span will wrap the child so we can use ref and events.
  // 3. Tip has more than one child => Abort, display Children.only error
  var child = _react.Children.count(children) <= 1 && ! /*#__PURE__*/_react["default"].isValidElement(children) && /*#__PURE__*/_react["default"].createElement("span", null, children) || _react.Children.only(children);
  var clonedChild = /*#__PURE__*/(0, _react.cloneElement)(child, {
    onMouseEnter: function onMouseEnter(event) {
      var _child$props;
      setOver(true);
      if ((_child$props = child.props) != null && _child$props.onMouseEnter) child.props.onMouseEnter(event);
    },
    onMouseLeave: function onMouseLeave(event) {
      var _child$props2;
      setOver(false);
      if ((_child$props2 = child.props) != null && _child$props2.onMouseLeave) child.props.onMouseLeave(event);
    },
    onFocus: function onFocus(event) {
      var _child$props3;
      if (usingKeyboard) setOver(true);
      if ((_child$props3 = child.props) != null && _child$props3.onFocus) child.props.onFocus(event);
    },
    onBlur: function onBlur(event) {
      var _child$props4;
      if (usingKeyboard) setOver(false);
      if ((_child$props4 = child.props) != null && _child$props4.onBlur) child.props.onBlur(event);
    },
    key: 'tip-child',
    ref: function ref(node) {
      // https://github.com/facebook/react/issues/8873#issuecomment-287873307
      if (typeof componentRef === 'function') {
        componentRef(node);
      } else if (componentRef) {
        componentRef.current = node;
      }
      // Call the original ref, if any
      var callerRef = getReactNodeRef(child);
      if (typeof callerRef === 'function') {
        callerRef(node);
      } else if (callerRef) {
        callerRef.current = node;
      }
    }
  });
  (0, _react.useEffect)(function () {
    setOver(defaultVisible);
  }, [defaultVisible]);
  return [clonedChild, (over || tooltipOver) && /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    key: "tip-keyboard",
    onEsc: function onEsc() {
      setOver(false);
      setTooltipOver(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
    target: componentRef.current,
    trapFocus: false,
    key: "tip-drop"
  }, theme.tip.drop, dropProps, {
    onMouseEnter: function onMouseEnter() {
      return setTooltipOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setTooltipOver(false);
    }
  }), plain ? content : /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.tip.content, content)))];
});
Tip.displayName = 'Tip';
Tip.propTypes = _propTypes.TipPropTypes;