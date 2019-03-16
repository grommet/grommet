import styled, { css } from 'styled-components';
import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';
var FIT_MAP = {
  cover: 'cover',
  contain: 'contain'
};
var fitStyle = css(["flex:1 1;overflow:hidden;object-fit:", ";"], function (props) {
  return FIT_MAP[props.fit];
});
var StyledImage = styled.img.withConfig({
  displayName: "StyledImage",
  componentId: "ey4zx9-0"
})(["", " ", " ", " ", ""], genericStyles, function (props) {
  return props.fit && fitStyle;
}, function (props) {
  return props.theme.image && props.theme.image.extend;
}, function (props) {
  return props.opacityProp && "opacity: " + (props.opacityProp === true ? props.theme.global.opacity.medium : props.theme.global.opacity[props.opacityProp] || props.opacityProp) + ";\n  ";
});
StyledImage.defaultProps = {};
Object.setPrototypeOf(StyledImage.defaultProps, defaultProps);
export { StyledImage };