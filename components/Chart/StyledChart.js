"use strict";

exports.__esModule = true;
exports.StyledChart = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var animateStyle = function animateStyle(_ref) {
  var theme = _ref.theme,
    typeProp = _ref.typeProp;
  var animateBounds;
  if (typeProp === 'line')
    // 200% allows the line to be squiggly
    animateBounds = ['stroke-dashoffset: 200%;', 'stroke-dashoffset: 0%;'];else if (typeProp === 'point') animateBounds = ['opacity: 0;', 'opacity: 1;'];else animateBounds = ['transform: scaleY(0);', 'transform: scaleY(1);'];
  return (0, _styledComponents.css)(["", " animation:", " ", " forwards;", ""], typeProp === 'line' && 'stroke-dasharray: 200%;', (0, _styledComponents.keyframes)(["from{", "}to{", "}"], animateBounds[0], animateBounds[1]), theme.global.animation.duration, (typeProp === 'bar' || typeProp === 'area') && 'transform-origin: center bottom 0;');
};
var StyledChart = exports.StyledChart = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledChart",
  componentId: "sc-1nae0gf-0"
})(["display:block;max-width:100%;overflow:visible;", " ", " ", ";"], _utils.genericStyles, function (props) {
  return props.animate && animateStyle(props);
}, function (props) {
  return props.theme.chart && props.theme.chart.extend;
});