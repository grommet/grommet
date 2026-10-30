"use strict";

exports.__esModule = true;
exports.StyledTextArea = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var plainStyle = (0, _styledComponents.css)(["outline:none;border:none;width:100%;-webkit-appearance:none;"]);
var resizeStyle = function resizeStyle(resize) {
  if (resize === 'horizontal') {
    return 'resize: horizontal;';
  }
  if (resize === 'vertical') {
    return 'resize: vertical;';
  }
  if (resize) {
    return 'resize: both;';
  }
  return 'resize: none;';
};
var StyledTextArea = exports.StyledTextArea = _styledComponents["default"].textarea.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTextArea",
  componentId: "sc-17i3mwp-0"
})(["", " ", " ", " ", " ", " ", ";", " max-width:100%;"], _utils.inputStyle, function (props) {
  return props.resize !== undefined && resizeStyle(props.resize);
}, function (props) {
  return props.fillArg && 'height: 100%;';
}, function (props) {
  return props.plain && plainStyle;
}, function (props) {
  return props.disabled && (0, _utils.disabledStyle)(props.theme.textArea.disabled && props.theme.textArea.disabled.opacity);
}, function (props) {
  return props.theme.textArea && props.theme.textArea.extend;
}, function (props) {
  return (0, _utils.scrollbarStyle)(props.theme);
});