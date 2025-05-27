import styled, { css } from 'styled-components';
import { focusStyle, normalizeColor, styledComponentsConfig } from '../../utils';
import { Box } from '../Box';
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var StyledRadioButtonContainer = styled.label.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonContainer",
  componentId: "sc-g1f6ld-0"
})(["display:flex;flex-direction:row;align-items:center;user-select:none;width:fit-content;", " ", " &:hover input:not([disabled]) + div,&:hover input:not([disabled]) + span{border-color:", ";}&:hover{background-color:", ";}", " ", ";"], function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return normalizeColor(props.theme.radioButton.hover.border.color, props.theme);
}, function (props) {
  return normalizeColor(!props.disabled && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme);
}, function (props) {
  return props.focus && !props.focusIndicator && "\n      input:not([disabled]) + div,\n      input:not([disabled]) + span {\n      border-color: " + normalizeColor(props.theme.radioButton.hover.border.color, props.theme) + ";\n    }\n    background-color: " + normalizeColor(!props.disabled && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme) + ";\n    ";
}, function (props) {
  return props.theme.radioButton.container.extend;
});
var StyledRadioButtonInput = styled.input.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonInput",
  componentId: "sc-g1f6ld-1"
})(["opacity:0;-moz-appearance:none;width:0;height:0;margin:0;", ";"], function (props) {
  return !props.disabled && 'cursor: pointer;';
});
var StyledRadioButtonLabel = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonLabel",
  componentId: "sc-g1f6ld-2"
})(["", ""], function (props) {
  return props.theme.radioButton.font.weight && css(["font-weight:", ";"], props.theme.radioButton.font.weight);
});
var StyledRadioButtonIcon = styled.svg.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonIcon",
  componentId: "sc-g1f6ld-3"
})(["box-sizing:border-box;width:", ";height:", ";fill:", ";transform:scale(1);", ";"], function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return normalizeColor(props.theme.radioButton.check.color || 'control', props.theme);
}, function (props) {
  return props.theme.radioButton.icon.extend;
});
var StyledRadioButtonBox = styled(Box).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonBox",
  componentId: "sc-g1f6ld-4"
})(["background-color:", ";transform:scale(1);", ";", ";"], function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.focus && focusStyle();
}, function (props) {
  return props.theme.radioButton.check.extend;
});
var StyledRadioButton = styled(Box).withConfig({
  displayName: "StyledRadioButton",
  componentId: "sc-g1f6ld-5"
})(["", ";"], function (props) {
  return props.theme.radioButton && props.theme.radioButton.extend;
});
export { StyledRadioButtonContainer, StyledRadioButtonInput, StyledRadioButtonLabel, StyledRadioButtonIcon, StyledRadioButtonBox, StyledRadioButton };