"use strict";

exports.__esModule = true;
exports.StyledStackLayer = exports.StyledStack = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var fillStyle = (0, _styledComponents.css)(["", " ", " flex-grow:1;display:flex;"], function (props) {
  return props.fillContainer === true || props.fillContainer === 'horizontal' ? "\n        width: 100%;\n        max-width: none;\n      " : '';
}, function (props) {
  return props.fillContainer === true || props.fillContainer === 'vertical' ? 'height: 100%;' : '';
});
var StyledStack = exports.StyledStack = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledStack",
  componentId: "sc-ajspsk-0"
})(["position:relative;", " ", " ", ""], _utils.genericStyles, function (props) {
  return props.fillContainer && fillStyle;
}, function (props) {
  return props.theme.stack && props.theme.stack.extend;
});
var styleMap = {
  fill: "\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n  ",
  center: "\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  ",
  left: "\n    top: 50%;\n    left: 0;\n    transform: translateY(-50%);\n  ",
  right: "\n    top: 50%;\n    right: 0;\n    transform: translateY(-50%);\n  ",
  top: "\n    top: 0;\n    left: 50%;\n    transform: translateX(-50%);\n  ",
  bottom: "\n    bottom: 0;\n    left: 50%;\n    transform: translateX(-50%);\n  ",
  'top-left': "\n    top: 0;\n    left: 0;\n  ",
  'bottom-left': "\n    bottom: 0;\n    left: 0;\n  ",
  'top-right': "\n    top: 0;\n    right: 0;\n  ",
  'bottom-right': "\n    bottom: 0;\n    right: 0;\n  "
};
var StyledStackLayer = exports.StyledStackLayer = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledStack__StyledStackLayer",
  componentId: "sc-ajspsk-1"
})(["position:", ";", " ", " ", " ", ""], function (props) {
  return props.guiding ? 'relative' : 'absolute';
}, function (props) {
  return props.guiding && 'display: block;';
}, function (props) {
  return !props.guiding && styleMap[props.anchor || 'fill'] + ";";
}, function (props) {
  return props.fillContainer && "\n    width: 100%;\n    height: 100%;\n  ";
}, function (props) {
  return !props.interactive && "pointer-events: none;";
});