"use strict";

exports.__esModule = true;
exports.StyledControl = exports.StyledCarouselContainer = exports.StyledCarouselChild = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var StyledCarouselContainer = exports.StyledCarouselContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCarousel__StyledCarouselContainer",
  componentId: "sc-c2hjel-0"
})(["position:relative;overflow:hidden;"]);
var animationKeyframes = {
  // Slide Right = Previous or Backward
  slideRightPrevious: (0, _styledComponents.keyframes)(["0%{transform:translateX(0%)}100%{transform:translateX(100%)}"]),
  slideRightCurrent: (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%)}100%{transform:translateX(0%)}"]),
  // Slide Left = Next or Forward
  slideLeftPrevious: (0, _styledComponents.keyframes)(["0%{transform:translateX(0%)}100%{transform:translateX(-100%)}"]),
  slideLeftCurrent: (0, _styledComponents.keyframes)(["0%{transform:translateX(100%)}100%{transform:translateX(0%)}"])
};
var StyledCarouselChild = exports.StyledCarouselChild = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCarousel__StyledCarouselChild",
  componentId: "sc-c2hjel-1"
})(["visibility:", ";position:", ";width:100%;height:100%;overflow:hidden;", ";animation-fill-mode:both;"], function (props) {
  return props.visibilityProp;
}, function (props) {
  return props.positionProp;
}, function (props) {
  return props.animationType ? (0, _styledComponents.css)(["animation:", " ", "s ease-in-out;"], animationKeyframes[props.animationType], props.animationDuration / 1000) : "";
});
var StyledControl = exports.StyledControl = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCarousel__StyledControl",
  componentId: "sc-c2hjel-2"
})(["position:absolute;z-index:1;", " align-items:center;justify-content:center;"], function (props) {
  return props.offsetProp + ": 0;";
});