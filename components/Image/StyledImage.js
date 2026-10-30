"use strict";

exports.__esModule = true;
exports.StyledImage = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var FIT_MAP = {
  cover: 'cover',
  contain: 'contain'
};
var fitStyle = (0, _styledComponents.css)(["flex:1 1;overflow:hidden;object-fit:", ";"], function (props) {
  return FIT_MAP[props.fit];
});
var StyledImage = exports.StyledImage = _styledComponents["default"].img.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledImage",
  componentId: "sc-ey4zx9-0"
})(["", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return props.fit && fitStyle;
}, function (props) {
  return props.fillProp && (0, _utils.fillStyle)(props.fillProp);
}, function (props) {
  return props.theme.image && props.theme.image.extend;
}, function (props) {
  return props.opacityProp && "opacity: " + (props.opacityProp === true ? props.theme.global.opacity.medium : props.theme.global.opacity[props.opacityProp] || props.opacityProp) + ";\n  ";
});