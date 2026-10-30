"use strict";

exports.__esModule = true;
exports.TextArea = void 0;
var _react = _interopRequireWildcard(require("react"));
var _FormContext = require("../Form/FormContext");
var _Keyboard = require("../Keyboard");
var _StyledTextArea = require("./StyledTextArea");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "fill", "focusIndicator", "name", "onBlur", "onChange", "onFocus", "onKeyDown", "value"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var TextArea = exports.TextArea = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    fill = _ref.fill,
    _ref$focusIndicator = _ref.focusIndicator,
    focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
    name = _ref.name,
    _onBlur = _ref.onBlur,
    _onChange = _ref.onChange,
    _onFocus = _ref.onFocus,
    onKeyDown = _ref.onKeyDown,
    valueProp = _ref.value,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];
  var _useState = (0, _react.useState)(),
    focus = _useState[0],
    setFocus = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: function onEsc(event) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    },
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react["default"].createElement(_StyledTextArea.StyledTextArea, _extends({
    "aria-label": a11yTitle,
    ref: ref,
    name: name,
    fillArg: fill,
    focus: focus,
    value: value,
    focusIndicator: focusIndicator
  }, passThemeFlag, rest, {
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    onChange: function onChange(event) {
      setValue(event.target.value);
      if (_onChange) _onChange(event);
    }
  })));
});
TextArea.displayName = 'TextArea';
TextArea.propTypes = _propTypes.TextAreaPropTypes;