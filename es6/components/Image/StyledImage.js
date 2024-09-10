import styled, { css } from 'styled-components';
import { fillStyle, genericStyles, styledComponentsConfig } from '../../utils';
var FIT_MAP = {
  cover: 'cover',
  contain: 'contain'
};
var fitStyle = css(["flex:1 1;overflow:hidden;object-fit:", ";"], function (props) {
  return FIT_MAP[props.fit];
});
var StyledImage = styled.img.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledImage",
  componentId: "sc-ey4zx9-0"
})(["", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return props.fit && fitStyle;
}, function (props) {
  return props.fillProp && fillStyle(props.fillProp);
}, function (props) {
  return props.theme.image && props.theme.image.extend;
}, function (props) {
  return props.opacityProp && "opacity: " + (props.opacityProp === true ? props.theme.global.opacity.medium : props.theme.global.opacity[props.opacityProp] || props.opacityProp) + ";\n  ";
});
export { StyledImage };