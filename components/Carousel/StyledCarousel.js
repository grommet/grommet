"use strict";

exports.__esModule = true;
exports.StyledControl = exports.StyledCarouselContainer = exports.StyledCarouselChild = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var StyledCarouselContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCarousel__StyledCarouselContainer",
  componentId: "sc-c2hjel-0"
})(["position:relative;overflow:hidden;"]);
exports.StyledCarouselContainer = StyledCarouselContainer;
var animationKeyframes = {
  // Slide Right = Previous or Backward
  slideRightPrevious: (0, _styledComponents.keyframes)(["0%{transform:translateX(0%)}100%{transform:translateX(100%)}"]),
  slideRightCurrent: (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%)}100%{transform:translateX(0%)}"]),
  // Slide Left = Next or Forward
  slideLeftPrevious: (0, _styledComponents.keyframes)(["0%{transform:translateX(0%)}100%{transform:translateX(-100%)}"]),
  slideLeftCurrent: (0, _styledComponents.keyframes)(["0%{transform:translateX(100%)}100%{transform:translateX(0%)}"])
};
var StyledCarouselChild = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCarousel__StyledCarouselChild",
  componentId: "sc-c2hjel-1"
})(["visibility:", ";position:", ";width:100%;height:100%;overflow:hidden;", ";animation-fill-mode:both;"], function (props) {
  return props.visibilityProp;
}, function (props) {
  return props.positionProp;
}, function (props) {
  return props.animationType ? (0, _styledComponents.css)(["animation:", " ", "s ease-in-out;"], animationKeyframes[props.animationType], props.animationDuration / 1000) : "";
});
exports.StyledCarouselChild = StyledCarouselChild;
var StyledControl = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCarousel__StyledControl",
  componentId: "sc-c2hjel-2"
})(["position:absolute;z-index:1;", " align-items:center;justify-content:center;"], function (props) {
  return props.offsetProp + ": 0;";
});
exports.StyledControl = StyledControl;