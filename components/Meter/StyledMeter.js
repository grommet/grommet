"use strict";

exports.__esModule = true;
exports.StyledMeter = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// fallback to edgeSize for backwards compatibility
var roundStyle = (0, _styledComponents.css)(["border-radius:", ";"], function (props) {
  return props.theme.global[props.theme.global.radius ? 'radius' : 'edgeSize'][props.round.size];
});

// overflow: hidden is needed for ie11
var StyledMeter = exports.StyledMeter = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledMeter",
  componentId: "sc-nsxarx-0"
})(["max-width:100%;overflow:hidden;", " ", " ", " path{transition:stroke 0.3s,stroke-width 0.3s;}", ";"], function (props) {
  return props.reverse && (0, _styledComponents.css)(["transform:scale(-1,1);"]);
}, _utils.genericStyles, function (props) {
  return props.round && roundStyle;
}, function (props) {
  return props.theme.meter && props.theme.meter.extend;
});