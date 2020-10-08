import styled, { css } from 'styled-components';
import { focusStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var StyledRadioButtonContainer = styled.label.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonContainer",
  componentId: "g1f6ld-0"
})(["display:flex;flex-direction:row;align-items:center;user-select:none;width:fit-content;", " ", ":hover input:not([disabled]) + div,:hover input:not([disabled]) + span{border-color:", ";}:hover{background-color:", ";}", ";"], function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return normalizeColor(props.theme.radioButton.hover.border.color, props.theme);
}, function (props) {
  return normalizeColor(!props.disabled && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme);
}, function (props) {
  return props.theme.radioButton.container.extend;
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
var StyledRadioButtonLabel = styled.span.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonLabel",
  componentId: "g1f6ld-2"
})(["", ""], function (props) {
  return props.theme.radioButton.font.weight && css(["font-weight:", ";"], props.theme.radioButton.font.weight);
});
StyledRadioButtonLabel.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonLabel.defaultProps, defaultProps);
var StyledRadioButtonIcon = styled.svg.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonIcon",
  componentId: "g1f6ld-3"
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
  componentId: "g1f6ld-4"
})(["background-color:", ";", ";", ";"], function (props) {
  return props.theme.radioButton.check.background && props.theme.radioButton.check.background.color;
}, function (props) {
  return props.focus && focusStyle();
}, function (props) {
  return props.theme.radioButton.check.extend;
});
StyledRadioButtonBox.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonBox.defaultProps, defaultProps);
var StyledRadioButton = styled.div.withConfig({
  displayName: "StyledRadioButton",
  componentId: "g1f6ld-5"
})(["", ";"], function (props) {
  return props.theme.radioButton && props.theme.radioButton.extend;
});
StyledRadioButton.defaultProps = {};
Object.setPrototypeOf(StyledRadioButton.defaultProps, defaultProps);
export { StyledRadioButtonContainer, StyledRadioButtonInput, StyledRadioButtonLabel, StyledRadioButtonIcon, StyledRadioButtonBox, StyledRadioButton };