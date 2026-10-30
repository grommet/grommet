"use strict";

exports.__esModule = true;
exports.StyledGrommet = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var fullStyle = function fullStyle(full, theme) {
  if (full === 'min') return (0, _styledComponents.css)(["min-height:100vh;"]);
  return (0, _styledComponents.css)(["width:100vw;height:100vh;", ""], (0, _utils.overflowStyle)('auto', theme));
};
var StyledGrommet = exports.StyledGrommet = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledGrommet",
  componentId: "sc-19lkkz7-0"
})(["", " ", " ", " ", " ", ""], function (props) {
  return !props.plain && _utils.baseStyle;
}, function (props) {
  return props.full && fullStyle(props.full, props.theme);
}, function (props) {
  return props.theme.global.font.face;
}, function (props) {
  return props.theme.grommet.extend;
}, function (props) {
  return props.cssVars && Object.keys(props.theme.global.colors).filter(function (k) {
    return typeof props.theme.global.colors[k] === 'string';
  }).map(function (k) {
    return "--" + k + ": " + props.theme.global.colors[k] + ";";
  }).join('\n');
});