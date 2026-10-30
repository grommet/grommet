"use strict";

exports.__esModule = true;
exports.StyledRadioButtonLabel = exports.StyledRadioButtonInput = exports.StyledRadioButtonIcon = exports.StyledRadioButtonContainer = exports.StyledRadioButtonBox = exports.StyledRadioButton = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var StyledRadioButtonContainer = exports.StyledRadioButtonContainer = _styledComponents["default"].label.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonContainer",
  componentId: "sc-g1f6ld-0"
})(["display:flex;flex-direction:row;align-items:center;user-select:none;width:fit-content;", " ", " &:hover input:not([disabled]) + div,&:hover input:not([disabled]) + span{border-color:", ";}&:hover{background-color:", ";}", " ", ";"], function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.radioButton.hover.border.color, props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)(!props.disabled && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme);
}, function (props) {
  return props.focus && !props.focusIndicator && "\n      input:not([disabled]) + div,\n      input:not([disabled]) + span {\n      border-color: " + (0, _utils.normalizeColor)(props.theme.radioButton.hover.border.color, props.theme) + ";\n    }\n    background-color: " + (0, _utils.normalizeColor)(!props.disabled && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme) + ";\n    ";
}, function (props) {
  return props.theme.radioButton.container.extend;
});
var StyledRadioButtonInput = exports.StyledRadioButtonInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonInput",
  componentId: "sc-g1f6ld-1"
})(["opacity:0;-moz-appearance:none;width:0;height:0;margin:0;", ";"], function (props) {
  return !props.disabled && 'cursor: pointer;';
});
var StyledRadioButtonLabel = exports.StyledRadioButtonLabel = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonLabel",
  componentId: "sc-g1f6ld-2"
})(["", ""], function (props) {
  return props.theme.radioButton.font.weight && (0, _styledComponents.css)(["font-weight:", ";"], props.theme.radioButton.font.weight);
});
var StyledRadioButtonIcon = exports.StyledRadioButtonIcon = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonIcon",
  componentId: "sc-g1f6ld-3"
})(["box-sizing:border-box;width:", ";height:", ";fill:", ";transform:scale(1);", ";"], function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.radioButton.check.color || 'control', props.theme);
}, function (props) {
  return props.theme.radioButton.icon.extend;
});
var StyledRadioButtonBox = exports.StyledRadioButtonBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonBox",
  componentId: "sc-g1f6ld-4"
})(["background-color:", ";transform:scale(1);", ";", ";"], function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.focus && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.radioButton.check.extend;
});
var StyledRadioButton = exports.StyledRadioButton = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledRadioButton",
  componentId: "sc-g1f6ld-5"
})(["", ";"], function (props) {
  return props.theme.radioButton && props.theme.radioButton.extend;
});