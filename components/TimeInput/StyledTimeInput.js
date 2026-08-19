"use strict";

exports.__esModule = true;
exports.StyledTimeInputSeparator = exports.StyledTimeInputSegment = exports.StyledTimeInputField = exports.StyledTimeInputDisplay = exports.StyledTimeInputContainer = exports.StyledTimeInput = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var StyledTimeInputContainer = exports.StyledTimeInputContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  // Keep Box styling props like border and round flowing into Box.
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'disabled' && prop !== 'readOnlyProp';
  }
}).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputContainer",
  componentId: "sc-xktdr3-0"
})(["", " ", " ", ""], function (props) {
  return props.disabled && (0, _utils.disabledStyle)();
}, function (props) {
  return props.readOnlyProp && (0, _utils.readOnlyStyle)(props.theme);
}, function (props) {
  return props.focusIndicator !== false && (0, _styledComponents.css)(["&:focus-within{", "}"], (0, _utils.focusStyle)());
});
var StyledTimeInput = exports.StyledTimeInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput",
  componentId: "sc-xktdr3-1"
})(["", " ", " position:relative;pointer-events:none;color:transparent;caret-color:transparent;text-shadow:none;&::selection{background:transparent;color:transparent;}&::placeholder{color:transparent;}"], _utils.inputStyle, _utils.plainInputStyle);
var StyledTimeInputField = exports.StyledTimeInputField = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputField",
  componentId: "sc-xktdr3-2"
})(["position:relative;flex:1 1 auto;min-width:0;"]);
var StyledTimeInputDisplay = exports.StyledTimeInputDisplay = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputDisplay",
  componentId: "sc-xktdr3-3"
})(["position:absolute;inset:0;display:flex;align-items:center;overflow:hidden;", ""], function (props) {
  return props.theme.global.input.padding && (typeof props.theme.global.input.padding !== 'object' ? "padding: " + ((0, _utils.parseMetricToNum)(props.theme.global.edgeSize[props.theme.global.input.padding] || props.theme.global.input.padding) - (0, _utils.parseMetricToNum)(props.theme.global.control.border.width)) + "px;" : (0, _utils.edgeStyle)('padding', props.theme.global.input.padding, props.responsive, props.theme.box.responsiveBreakpoint, props.theme));
});
var StyledTimeInputSeparator = exports.StyledTimeInputSeparator = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputSeparator",
  componentId: "sc-xktdr3-4"
})(["display:inline-flex;align-items:center;line-height:inherit;color:", ";", ""], function (props) {
  return (0, _utils.normalizeColor)(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
});
var StyledTimeInputSegment = exports.StyledTimeInputSegment = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputSegment",
  componentId: "sc-xktdr3-5"
})(["&:focus{outline:none;}display:inline-flex;align-items:center;position:relative;line-height:inherit;padding-inline:", ";color:", ";", " ", ""], function (props) {
  var _props$theme$timeInpu, _props$theme$global$e;
  var padToken = (_props$theme$timeInpu = props.theme.timeInput) == null || (_props$theme$timeInpu = _props$theme$timeInpu.active) == null ? void 0 : _props$theme$timeInpu.pad;
  return ((_props$theme$global$e = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e[padToken]) || padToken;
}, function (props) {
  return (0, _utils.normalizeColor)(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
}, function (props) {
  var _props$theme$global$e2, _props$theme$timeInpu2, _props$theme$global$b, _props$theme$global$e3, _props$theme$timeInpu3, _props$theme$timeInpu4;
  if (!props.$active) return '';

  // The active indicator's corner rounding is intentionally a fixed
  // "hair" edge size rather than a theme-exposed value we can expose
  // theme in future.
  var activeRound = (_props$theme$global$e2 = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e2.hair;
  var activeBorderToken = (_props$theme$timeInpu2 = props.theme.timeInput) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.active) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.indicator) == null ? void 0 : _props$theme$timeInpu2.size;
  var activeBorderSize = ((_props$theme$global$b = props.theme.global.borderSize) == null ? void 0 : _props$theme$global$b[activeBorderToken]) || ((_props$theme$global$e3 = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e3[activeBorderToken]) || activeBorderToken || props.theme.global.borderSize.small;
  return (0, _styledComponents.css)(["&::before{content:'';position:absolute;inset:0;background-color:", ";border-top-left-radius:", ";border-top-right-radius:", ";}&::after{content:'';position:absolute;left:0;right:0;bottom:0;height:", ";background-color:", ";border-bottom-left-radius:", ";border-bottom-right-radius:", ";}"], (0, _utils.normalizeColor)((_props$theme$timeInpu3 = props.theme.timeInput) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.active) == null ? void 0 : _props$theme$timeInpu3.background, props.theme), activeRound, activeRound, activeBorderSize, (0, _utils.normalizeColor)(((_props$theme$timeInpu4 = props.theme.timeInput) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.active) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.indicator) == null ? void 0 : _props$theme$timeInpu4.color) || {
    dark: 'white',
    light: 'black'
  }, props.theme), activeRound, activeRound);
});