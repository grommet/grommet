"use strict";

exports.__esModule = true;
exports.StyledDateTimeInputSeparator = exports.StyledDateTimeInputSegment = exports.StyledDateTimeInputField = exports.StyledDateTimeInputDisplay = exports.StyledDateTimeInputContainer = exports.StyledDateTimeInput = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var getActiveTokens = function getActiveTokens(theme) {
  var _theme$dateTimeInput, _theme$timeInput;
  return ((_theme$dateTimeInput = theme.dateTimeInput) == null ? void 0 : _theme$dateTimeInput.active) || ((_theme$timeInput = theme.timeInput) == null ? void 0 : _theme$timeInput.active);
};
var StyledDateTimeInputContainer = exports.StyledDateTimeInputContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'disabled' && prop !== 'readOnlyProp';
  }
}).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputContainer",
  componentId: "sc-d6m1ya-0"
})(["", " ", " ", ""], function (props) {
  return props.disabled && (0, _utils.disabledStyle)();
}, function (props) {
  return props.readOnlyProp && (0, _utils.readOnlyStyle)(props.theme);
}, function (props) {
  return props.focusIndicator !== false && (0, _styledComponents.css)(["&:focus-within:not(:has(button:focus-visible)){", "}"], (0, _utils.focusStyle)());
});
var StyledDateTimeInput = exports.StyledDateTimeInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput",
  componentId: "sc-d6m1ya-1"
})(["", " ", " position:relative;pointer-events:none;color:transparent;caret-color:transparent;text-shadow:none;&::selection{background:transparent;color:transparent;}&::placeholder{color:transparent;}"], _utils.inputStyle, _utils.plainInputStyle);
var StyledDateTimeInputField = exports.StyledDateTimeInputField = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputField",
  componentId: "sc-d6m1ya-2"
})(["position:relative;flex:1 1 auto;min-width:0;"]);
var StyledDateTimeInputDisplay = exports.StyledDateTimeInputDisplay = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputDisplay",
  componentId: "sc-d6m1ya-3"
})(["position:absolute;inset:0;display:flex;align-items:center;overflow:hidden;", ""], function (props) {
  return props.theme.global.input.padding && (typeof props.theme.global.input.padding !== 'object' ? "padding: " + ((0, _utils.parseMetricToNum)(props.theme.global.edgeSize[props.theme.global.input.padding] || props.theme.global.input.padding) - (0, _utils.parseMetricToNum)(props.theme.global.control.border.width)) + "px;" : (0, _utils.edgeStyle)('padding', props.theme.global.input.padding, props.responsive, props.theme.box.responsiveBreakpoint, props.theme));
});
var StyledDateTimeInputSeparator = exports.StyledDateTimeInputSeparator = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputSeparator",
  componentId: "sc-d6m1ya-4"
})(["display:inline-flex;align-items:center;line-height:inherit;color:", ";padding-inline:", ";", ""], function (props) {
  return (0, _utils.normalizeColor)(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  return props.$paddingInline;
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
});
var StyledDateTimeInputSegment = exports.StyledDateTimeInputSegment = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputSegment",
  componentId: "sc-d6m1ya-5"
})(["&:focus{outline:none;}display:inline-flex;align-items:center;position:relative;line-height:inherit;color:", ";", " ", ""], function (props) {
  return (0, _utils.normalizeColor)(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
}, function (props) {
  var _props$theme$global$e, _activeTokens$indicat, _props$theme$global$b, _props$theme$global$e2, _activeTokens$indicat2;
  if (!props.$active) return '';
  var activeTokens = getActiveTokens(props.theme);
  var activeRound = (_props$theme$global$e = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e.hair;
  var activeBorderToken = activeTokens == null || (_activeTokens$indicat = activeTokens.indicator) == null ? void 0 : _activeTokens$indicat.size;
  var activeBorderSize = ((_props$theme$global$b = props.theme.global.borderSize) == null ? void 0 : _props$theme$global$b[activeBorderToken]) || ((_props$theme$global$e2 = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e2[activeBorderToken]) || activeBorderToken || props.theme.global.borderSize.small;
  return (0, _styledComponents.css)(["&::before{content:'';position:absolute;inset:0;background-color:", ";border-top-left-radius:", ";border-top-right-radius:", ";}&::after{content:'';position:absolute;left:0;right:0;bottom:0;height:", ";background-color:", ";border-bottom-left-radius:", ";border-bottom-right-radius:", ";}"], (0, _utils.normalizeColor)(activeTokens == null ? void 0 : activeTokens.background, props.theme), activeRound, activeRound, activeBorderSize, (0, _utils.normalizeColor)((activeTokens == null || (_activeTokens$indicat2 = activeTokens.indicator) == null ? void 0 : _activeTokens$indicat2.color) || {
    dark: 'white',
    light: 'black'
  }, props.theme), activeRound, activeRound);
});