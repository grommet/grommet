"use strict";

exports.__esModule = true;
exports.StyledControl = exports.StyledCarouselContainer = exports.StyledCarouselChild = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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