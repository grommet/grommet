"use strict";

exports.__esModule = true;
exports.StyledControl = exports.StyledCarouselContainer = exports.StyledCarouselChild = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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