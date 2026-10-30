"use strict";

exports.__esModule = true;
exports.StyledTextInputContainer = exports.StyledTextInput = exports.StyledSuggestions = exports.StyledPlaceholder = exports.StyledIcon = exports.StyledActionsGroup = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _styles = require("../../utils/styles");
var _readOnly = require("../../utils/readOnly");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var getPlainStyle = function getPlainStyle(plain) {
  if (plain === 'full') {
    return (0, _styledComponents.css)(["", ";padding:0;"], _utils.plainInputStyle);
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
  return (props.readOnly || props.hasButton) && "border: none;";
}, function (props) {
  return getPlainStyle(props.plain);
}, function (props) {
  return props.icon && !props.hasActionsGroup && _styles.inputPadForIcon;
}, function (props) {
  return (
    // the static leading icon already pads its right side
    props.hasLeadingIcon && props.hasActionsGroup && 'padding-left: 0px;'
  );
}, function (props) {
  return (
    // avoid a second, native clear button on type="search" in WebKit/Blink
    props.hasClear && "&::-webkit-search-cancel-button {\n      -webkit-appearance: none;\n      appearance: none;\n    }"
  );
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
  return (
    // The container owns the border so the actions group remains inside
    // the field.
    (props.readOnlyProp || props.hasButton) && !props.plain && _utils.controlBorderStyle
  );
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
  if (props.hasActionsGroup) {
    return "\n        position: static;\n        align-items: center;\n        transform: none;\n        padding-left: " + (0, _utils.getInputPadBySide)(props, 'left') + ";\n        padding-right: " + (0, _utils.getInputPadBySide)(props, 'right') + ";\n      ";
  }
  return props.reverse ? "right: " + (0, _utils.getInputPadBySide)(props, 'right') + ";" : "left: " + (0, _utils.getInputPadBySide)(props, 'left') + ";";
});
var StyledActionsGroup = exports.StyledActionsGroup = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledActionsGroup",
  componentId: "sc-1x30a0s-4"
})(["display:flex;align-items:stretch;z-index:1;"]);
var StyledSuggestions = exports.StyledSuggestions = _styledComponents["default"].ol.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledSuggestions",
  componentId: "sc-1x30a0s-5"
})(["border-top-left-radius:0;border-top-right-radius:0;margin:0;padding:0;list-style-type:none;", ";"], function (props) {
  return props.theme.textInput && props.theme.textInput.suggestions && props.theme.textInput.suggestions.extend;
});