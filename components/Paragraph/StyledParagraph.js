"use strict";

exports.__esModule = true;
exports.StyledParagraph = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var colorStyle = (0, _styledComponents.css)(["color:", ";"], function (props) {
  return (0, _utils.normalizeColor)(props.colorProp, props.theme);
});
var sizeStyle = function sizeStyle(props) {
  var size = props.size || 'medium';
  var data = props.theme.paragraph[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";max-width:", ";"], data ? data.size : size, data ? data.height : 'normal', props.fillProp ? 'none' : data && data.maxWidth);
};
var fontFamily = (0, _styledComponents.css)(["font-family:", ";"], function (props) {
  return props.theme.paragraph.font.family;
});
var maxlinesStyle = function maxlinesStyle(props) {
  return props.maxLines && (0, _styledComponents.css)(["display:-webkit-box;-webkit-line-clamp:", ";-webkit-box-orient:vertical;overflow:hidden;"], props.maxLines);
};
var StyledParagraph = exports.StyledParagraph = _styledComponents["default"].p.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledParagraph",
  componentId: "sc-tbetod-0"
})(["", " ", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return maxlinesStyle(props);
}, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && _utils.textAlignStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.theme.paragraph.font && props.theme.paragraph.font.family && fontFamily;
}, function (props) {
  return props.theme.paragraph && props.theme.paragraph.extend;
});