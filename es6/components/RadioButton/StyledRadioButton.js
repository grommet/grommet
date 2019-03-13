import styled from 'styled-components';
import { focusStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var StyledRadioButtonContainer = styled.label.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonContainer",
  componentId: "g1f6ld-0"
})(["user-select:none;", " ", ":hover input:not([disabled]) + div,:hover input:not([disabled]) + span{border-color:", ";}", ";"], function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return normalizeColor(props.theme.radioButton.hover.border.color, props.theme);
}, function (props) {
  return props.theme.radioButton.extend;
});
StyledRadioButtonContainer.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonContainer.defaultProps, defaultProps);
var StyledRadioButtonInput = styled.input.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonInput",
  componentId: "g1f6ld-1"
})(["opacity:0;-moz-appearance:none;width:0;height:0;margin:0;", ";"], function (props) {
  return !props.disabled && 'cursor: pointer;';
});
StyledRadioButtonInput.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonInput.defaultProps, defaultProps);
var StyledRadioButtonIcon = styled.svg.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonIcon",
  componentId: "g1f6ld-2"
})(["box-sizing:border-box;width:", ";height:", ";fill:", ";", ";"], function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return normalizeColor(props.theme.radioButton.check.color || 'control', props.theme);
}, function (props) {
  return props.theme.radioButton.icon.extend;
});
StyledRadioButtonIcon.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonIcon.defaultProps, defaultProps);
var StyledRadioButtonBox = styled.div.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonBox",
  componentId: "g1f6ld-3"
})(["", ";", ";"], function (props) {
  return props.focus && focusStyle;
}, function (props) {
  return props.theme.radioButton.check.extend;
});
StyledRadioButtonBox.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonBox.defaultProps, defaultProps);
var StyledRadioButton = styled.div.withConfig({
  displayName: "StyledRadioButton",
  componentId: "g1f6ld-4"
})(["", ";"], function (props) {
  return props.theme.radioButton && props.theme.radioButton.extend;
});
StyledRadioButton.defaultProps = {};
Object.setPrototypeOf(StyledRadioButton.defaultProps, defaultProps);
export { StyledRadioButtonContainer, StyledRadioButtonInput, StyledRadioButtonIcon, StyledRadioButtonBox, StyledRadioButton };