import styled, { keyframes } from 'styled-components';
import { baseStyle, edgeStyle, roundStyle } from '../../utils/styles';
import { backgroundStyle } from '../../utils/background';
import { defaultProps } from '../../default-props';

function getTransformOriginStyle(align) {
  var vertical = 'top';

  if (align.bottom) {
    vertical = 'bottom';
  }

  var horizontal = 'left';

  if (align.right) {
    horizontal = 'right';
  }

  return vertical + " " + horizontal;
}

var dropKeyFrames = keyframes(["0%{opacity:0.5;transform:scale(0.8);}100%{opacity:1;transform:scale(1);}"]);
var StyledDrop = styled.div.withConfig({
  displayName: "StyledDrop",
  componentId: "sc-16s5rx8-0"
})(["", " ", " position:fixed;z-index:", ";outline:none;", " ", " opacity:0;transform-origin:", ";animation:", " 0.1s forwards;animation-delay:0.01s;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){display:flex;align-items:stretch;}", ""], baseStyle, function (props) {
  return !props.plain && (props.round && roundStyle(props.round, true, props.theme) || "border-radius: " + props.theme.global.drop.border.radius + ";");
}, function (props) {
  return props.theme.global.drop.zIndex;
}, function (props) {
  return !props.plain && backgroundStyle(props.background || props.theme.global.drop.background, props.theme);
}, function (props) {
  return !props.plain && (props.margin || props.theme.global.drop.margin) && props.theme.global && edgeStyle('margin', props.margin || props.theme.global.drop.margin, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
}, function (props) {
  return getTransformOriginStyle(props.alignProp);
}, dropKeyFrames, function (props) {
  return props.theme.global.drop && props.theme.global.drop.extend;
});
StyledDrop.defaultProps = {};
Object.setPrototypeOf(StyledDrop.defaultProps, defaultProps);
export { StyledDrop };