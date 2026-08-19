"use strict";

exports.__esModule = true;
exports.StyledTextInputContainer = exports.StyledTextInput = exports.StyledSuggestions = exports.StyledPlaceholder = exports.StyledInlineIcon = exports.StyledInlineButton = exports.StyledIcon = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _styles = require("../../utils/styles");
var _readOnly = require("../../utils/readOnly");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var getInlineButtonPad = function getInlineButtonPad(props) {
  var rightInset = Number.parseFloat((0, _utils.getInputPadBySide)(props, 'right'));
  var iconPad = Number.parseFloat((0, _styles.getInputIconPad)(props));
  var trailingIconPad = props.hasTrailingIcon ? iconPad : 0;
  // Reserve both the icon space and the control's edge inset so text clears
  // the flush-right password toggle, and the reversed icon when both coexist.
  return iconPad + trailingIconPad + rightInset + "px";
};
var getPlainStyle = function getPlainStyle(plain) {
  if (plain === 'full') {
    return (0, _styledComponents.css)(["", " padding:0;"], _utils.plainInputStyle);
  }
  return plain && _utils.plainInputStyle;
};
var StyledTextInput = exports.StyledTextInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput",
  componentId: "sc-1x30a0s-0"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ";"], _utils.inputStyle, function (props) {
  return (props.hasButton || props.readOnlyCopy) && 'flex: 1 1 auto;';
}, function (props) {
  return (props.hasButton || props.readOnlyCopy) && 'min-width: 0;';
}, function (props) {
  return props.readOnlyCopy || props.hasButton ? "padding-" + (props.reverse ? 'left' : 'right') + ": 0px;" : '';
}, function (props) {
  return props.readOnly && "border: none;";
}, function (props) {
  return getPlainStyle(props.plain);
}, function (props) {
  return props.icon && _styles.inputPadForIcon;
}, function (props) {
  return props.hasInlineButton && "padding-right: " + getInlineButtonPad(props) + ";";
}, function (props) {
  return props.disabled && (0, _utils.disabledStyle)(props.theme.textInput.disabled && props.theme.textInput.disabled.opacity);
}, function (props) {
  return props.textAlign && _utils.textAlignStyle;
}, function (props) {
  return props.widthProp && !props.readOnly && (0, _utils.widthStyle)(props.widthProp, props.theme);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.extend;
});
var StyledTextInputContainer = exports.StyledTextInputContainer = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledTextInputContainer",
  componentId: "sc-1x30a0s-1"
})(["position:relative;width:100%;", " ", ";", ";", " ", ";"], function (props) {
  return props.widthProp && props.readOnlyProp && (0, _utils.widthStyle)(props.widthProp, props.theme);
}, function (props) {
  return props.readOnlyProp && !props.plain && _utils.controlBorderStyle;
}, function (props) {
  return (props.readOnlyCopy || props.hasButton) && "\n    box-sizing: border-box;\n    flex-direction: row;\n    display: flex;\n    align-items: stretch;\n  ";
}, function (props) {
  return props.readOnlyProp && !props.plain && (0, _readOnly.readOnlyStyle)(props.theme);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.container && props.theme.textInput.container.extend;
});
var StyledPlaceholder = exports.StyledPlaceholder = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledPlaceholder",
  componentId: "sc-1x30a0s-2"
})(["position:absolute;left:", "px;top:50%;transform:translateY(-50%);display:flex;justify-content:center;pointer-events:none;", ";"], function (props) {
  return (0, _utils.parseMetricToNum)((0, _utils.getInputPadBySide)(props, 'left')) - (0, _utils.parseMetricToNum)(props.theme.global.control.border.width);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.placeholder && props.theme.textInput.placeholder.extend;
});
var StyledIcon = exports.StyledIcon = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledIcon",
  componentId: "sc-1x30a0s-3"
})(["position:absolute;display:flex;justify:center;top:50%;transform:translateY(-50%);pointer-events:none;", ""], function (props) {
  return props.reverse ? "right: " + (0, _utils.getInputPadBySide)(props, 'right') + ";" : "left: " + (0, _utils.getInputPadBySide)(props, 'left') + ";";
});
var StyledInlineButton = exports.StyledInlineButton = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledInlineButton",
  componentId: "sc-1x30a0s-4"
})(["position:absolute;display:flex;align-items:stretch;top:0;right:0;bottom:0;z-index:1;"]);
var StyledInlineIcon = exports.StyledInlineIcon = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledInlineIcon",
  componentId: "sc-1x30a0s-5"
})(["display:flex;align-items:center;justify-content:center;pointer-events:none;"]);
var StyledSuggestions = exports.StyledSuggestions = _styledComponents["default"].ol.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledSuggestions",
  componentId: "sc-1x30a0s-6"
})(["border-top-left-radius:0;border-top-right-radius:0;margin:0;padding:0;list-style-type:none;", ";"], function (props) {
  return props.theme.textInput && props.theme.textInput.suggestions && props.theme.textInput.suggestions.extend;
});