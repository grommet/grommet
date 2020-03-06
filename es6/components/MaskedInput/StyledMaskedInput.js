import styled, { css } from 'styled-components';
import { focusStyle, inputStyle, placeholderStyle } from '../../utils';

var sizeStyle = function sizeStyle(props) {
  var data = props.theme.text[props.size];
  return css(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var plainStyle = css(["border:none;"]);
export var StyledMaskedInput = styled.input.withConfig({
  displayName: "StyledMaskedInput",
  componentId: "sc-99vkfa-0"
})(["", " width:100%;", " ", " ", " ", " &::-moz-focus-inner{border:none;outline:none;}", ";", ";"], inputStyle, function (props) {
  return props.size && sizeStyle(props);
}, function (props) {
  return props.plain && plainStyle;
}, placeholderStyle, function (props) {
  return props.icon && (props.reverse ? "padding-right: " + props.theme.global.edgeSize.large + ";" : "padding-left: " + props.theme.global.edgeSize.large + ";");
}, function (props) {
  return props.focus && !props.plain && focusStyle;
}, function (props) {
  return props.theme.maskedInput && props.theme.maskedInput.extend;
});
export var StyledMaskedInputContainer = styled.div.withConfig({
  displayName: "StyledMaskedInput__StyledMaskedInputContainer",
  componentId: "sc-99vkfa-1"
})(["position:relative;width:100%;"]);
export var StyledIcon = styled.div.withConfig({
  displayName: "StyledMaskedInput__StyledIcon",
  componentId: "sc-99vkfa-2"
})(["position:absolute;display:flex;justify:center;top:50%;transform:translateY(-50%);pointer-events:none;", ""], function (props) {
  return props.reverse ? "right: " + props.theme.global.input.padding + ";" : "left: " + props.theme.global.input.padding + ";";
});