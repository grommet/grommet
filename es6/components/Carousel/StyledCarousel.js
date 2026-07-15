import styled, { css, keyframes } from 'styled-components';
import { Box } from '../Box';
var StyledCarouselContainer = styled(Box).withConfig({
  displayName: "StyledCarousel__StyledCarouselContainer",
  componentId: "sc-c2hjel-0"
})(["position:relative;overflow:hidden;"]);
var animationKeyframes = {
  // Slide Right = Previous or Backward
  slideRightPrevious: keyframes(["0%{transform:translateX(0%)}100%{transform:translateX(100%)}"]),
  slideRightCurrent: keyframes(["0%{transform:translateX(-100%)}100%{transform:translateX(0%)}"]),
  // Slide Left = Next or Forward
  slideLeftPrevious: keyframes(["0%{transform:translateX(0%)}100%{transform:translateX(-100%)}"]),
  slideLeftCurrent: keyframes(["0%{transform:translateX(100%)}100%{transform:translateX(0%)}"])
};
var StyledCarouselChild = styled(Box).withConfig({
  displayName: "StyledCarousel__StyledCarouselChild",
  componentId: "sc-c2hjel-1"
})(["visibility:", ";position:", ";width:100%;height:100%;overflow:hidden;", ";animation-fill-mode:both;"], function (props) {
  return props.visibilityProp;
}, function (props) {
  return props.positionProp;
}, function (props) {
  return props.animationType ? css(["animation:", " ", "s ease-in-out;"], animationKeyframes[props.animationType], props.animationDuration / 1000) : "";
});
var StyledControl = styled(Box).withConfig({
  displayName: "StyledCarousel__StyledControl",
  componentId: "sc-c2hjel-2"
})(["position:absolute;z-index:1;", " align-items:center;justify-content:center;"], function (props) {
  return props.offsetProp + ": 0;";
});
export { StyledCarouselContainer, StyledCarouselChild, StyledControl };