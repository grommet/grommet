import styled, { keyframes } from 'styled-components';
import { baseStyle } from '../../utils';
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
})(["", " border-radius:", ";position:fixed;z-index:", ";outline:none;", " opacity:0;transform-origin:", ";animation:", " 0.1s forwards;animation-delay:0.01s;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){display:flex;align-items:stretch;}", ""], baseStyle, function (props) {
  return props.theme.global.drop.border.radius;
}, function (props) {
  return props.theme.global.drop.zIndex;
}, function (props) {
  return !props.plain && backgroundStyle(props.theme.global.drop.background, props.theme);
}, function (props) {
  return getTransformOriginStyle(props.alignProp);
}, dropKeyFrames, function (props) {
  return props.theme.global.drop && props.theme.global.drop.extend;
});
StyledDrop.defaultProps = {};
Object.setPrototypeOf(StyledDrop.defaultProps, defaultProps);
export { StyledDrop };