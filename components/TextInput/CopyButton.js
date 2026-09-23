"use strict";

exports.__esModule = true;
exports.CopyButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Copy = require("grommet-icons/icons/Copy");
var _Button = require("../Button");
var _Tip = require("../Tip");
var _styles = require("../../utils/styles");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _MessageContext = require("../../contexts/MessageContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// to overcome `plain` styling due to (icon && !label) condition
// in buttons without theme.button.default, apply the padding here
var StyledButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "CopyButton__StyledButton",
  componentId: "sc-1bp1m18-0"
})(["border-radius:", ";", ""], function (props) {
  return props.theme.global.control.border.radius;
}, function (props) {
  return !props.theme.button["default"] ? (0, _styles.edgeStyle)('padding', props.pad, false, undefined, props.theme) : '';
});
var CopyButton = exports.CopyButton = function CopyButton(_ref) {
  var _theme$textInput, _theme$global$input$p, _theme$global$input$p2, _theme$global$input$p3;
  var ariaLabel = _ref.ariaLabel,
    authoredType = _ref.authoredType,
    disabled = _ref.disabled,
    messages = _ref.messages,
    onCopy = _ref.onCopy,
    onBlurCopy = _ref.onBlurCopy,
    tip = _ref.tip,
    value = _ref.value;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var CopyIcon = ((_theme$textInput = theme.textInput) == null || (_theme$textInput = _theme$textInput.icons) == null ? void 0 : _theme$textInput.copy) || _Copy.Copy;
  // never expose the masked value via the accessible name
  var buttonAriaLabel = ariaLabel || ((authoredType == null ? void 0 : authoredType.toLowerCase()) !== 'password' && (value || value === 0) ? format({
    id: 'input.readOnlyCopy.promptWithValue',
    messages: messages,
    values: {
      value: value
    }
  }) : format({
    id: 'input.readOnlyCopy.prompt',
    messages: messages
  }));
  return /*#__PURE__*/_react["default"].createElement(_Tip.Tip, {
    dropProps: {
      align: {
        bottom: 'top'
      }
    },
    content: tip
  }, /*#__PURE__*/_react["default"].createElement(StyledButton, _extends({
    disabled: disabled,
    onClick: onCopy,
    icon: /*#__PURE__*/_react["default"].createElement(CopyIcon, null),
    pad: {
      horizontal: (_theme$global$input$p = theme.global.input.padding) == null ? void 0 : _theme$global$input$p.horizontal,
      left: (_theme$global$input$p2 = theme.global.input.padding) == null ? void 0 : _theme$global$input$p2.left,
      right: (_theme$global$input$p3 = theme.global.input.padding) == null ? void 0 : _theme$global$input$p3.right,
      // only apply horizontal padding since button will
      // fill height of input
      top: '0',
      bottom: '0'
    },
    onBlur: onBlurCopy,
    onMouseOut: onBlurCopy,
    "aria-label": buttonAriaLabel
  }, passThemeFlag)));
};