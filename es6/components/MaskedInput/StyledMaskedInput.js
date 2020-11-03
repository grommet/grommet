import styled from 'styled-components';
import { disabledStyle, getInputPadBySide, inputStyle, plainInputStyle } from '../../utils';
export var StyledMaskedInput = styled.input.withConfig({
  displayName: "StyledMaskedInput",
  componentId: "sc-99vkfa-0"
})(["", " ", " ", " ", " ", ";"], inputStyle, function (props) {
  return props.plain && plainInputStyle;
}, function (props) {
  return props.icon && (props.reverse ? "padding-right: " + props.theme.global.edgeSize.large + ";" : "padding-left: " + props.theme.global.edgeSize.large + ";");
}, function (props) {
  return props.disabled && disabledStyle(props.theme.maskedInput.disabled && props.theme.maskedInput.disabled.opacity);
}, function (props) {
  return props.theme.maskedInput && props.theme.maskedInput.extend;
});
export var StyledMaskedInputContainer = styled.div.withConfig({
  displayName: "StyledMaskedInput__StyledMaskedInputContainer",
  componentId: "sc-99vkfa-1"
})(["position:relative;width:100%;", ";"], function (props) {
  return props.theme.maskedInput && props.theme.maskedInput.container && props.theme.maskedInput.container.extend;
});
export var StyledIcon = styled.div.withConfig({
  displayName: "StyledMaskedInput__StyledIcon",
  componentId: "sc-99vkfa-2"
})(["position:absolute;display:flex;justify:center;top:50%;transform:translateY(-50%);pointer-events:none;", ""], function (props) {
  return props.reverse ? "right: " + getInputPadBySide(props, 'right') + ";" : "left: " + getInputPadBySide(props, 'left') + ";";
});