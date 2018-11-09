import styled from 'styled-components';
import { focusStyle, normalizeColor } from '../../utils';
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
export var StyledRadioButtonContainer = styled.label.withConfig({
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
export var StyledRadioButtonInput = styled.input.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonInput",
  componentId: "g1f6ld-1"
})(["position:absolute;opacity:0;top:0;left:0;width:100%;height:100%;margin:0;z-index:1;", ";"], function (props) {
  return !props.disabled && 'cursor: pointer;';
});
export var StyledRadioButtonIcon = styled.svg.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonIcon",
  componentId: "g1f6ld-2"
})(["box-sizing:border-box;position:absolute;width:", ";height:", ";fill:", ";", ";"], function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return normalizeColor(props.theme.radioButton.check.color || 'control', props.theme);
}, function (props) {
  return props.theme.radioButton.icon.extend;
});
export var StyledRadioButtonBox = styled.div.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonBox",
  componentId: "g1f6ld-3"
})(["", ";", ";"], function (props) {
  return props.focus && focusStyle;
}, function (props) {
  return props.theme.radioButton.check.extend;
});
export var StyledRadioButton = styled.div.withConfig({
  displayName: "StyledRadioButton",
  componentId: "g1f6ld-4"
})(["position:relative;", ";"], function (props) {
  return props.theme.radioButton && props.theme.radioButton.extend;
});