import styled, { css } from 'styled-components';
import { focusStyle, normalizeColor } from '../../utils';
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var hoverStyle = css([":hover input:not([disabled]) + div,:hover input:not([disabled]) + span{border-color:", ";}"], function (props) {
  return normalizeColor(props.theme.checkBox.hover.border.color, props.theme);
});
export var StyledCheckBoxIcon = styled.svg.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxIcon",
  componentId: "sc-1dbk5ju-0"
})(["box-sizing:border-box;position:absolute;stroke-width:", ";stroke:", ";width:", ";height:", ";", ";"], function (props) {
  return props.theme.checkBox.check.thickness;
}, function (props) {
  return normalizeColor(props.theme.checkBox.color || 'control', props.theme);
}, function (props) {
  return props.theme.checkBox.icon.size || props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.icon.size || props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.icon.extend;
});
export var StyledCheckBoxContainer = styled.label.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxContainer",
  componentId: "sc-1dbk5ju-1"
})(["user-select:none;", " ", " ", " ", ""], function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return props.theme.checkBox.hover.border.color && hoverStyle;
}, function (props) {
  return props.theme.checkBox.extend;
});
export var StyledCheckBoxInput = styled.input.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxInput",
  componentId: "sc-1dbk5ju-2"
})(["position:absolute;opacity:0;top:0;left:0;width:100%;height:100%;margin:0;z-index:1;", ":checked + span > span{left:calc( ", " - ", " );background:", ";}"], function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return props.theme.checkBox.toggle.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return normalizeColor(props.theme.checkBox.color || 'control', props.theme);
});
export var StyledCheckBoxBox = styled.div.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxBox",
  componentId: "sc-1dbk5ju-3"
})(["", ";"], function (props) {
  return props.theme.checkBox.check.extend;
});
export var StyledCheckBoxToggle = styled.span.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxToggle",
  componentId: "sc-1dbk5ju-4"
})(["box-sizing:border-box;position:relative;vertical-align:middle;display:inline-block;width:", ";height:", ";border:", " solid;border-color:", ";border-radius:", ";background-color:", ";", ";", ";"], function (props) {
  return props.theme.checkBox.toggle.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return normalizeColor(props.theme.checkBox.border.color, props.theme);
}, function (props) {
  return props.theme.checkBox.toggle.radius;
}, function (props) {
  return props.theme.checkBox.toggle.background ? normalizeColor(props.theme.checkBox.toggle.background, props.theme) : 'transparent';
}, function (props) {
  return props.focus && focusStyle;
}, function (props) {
  return props.theme.checkBox.toggle.extend;
});
export var StyledCheckBoxKnob = styled.span.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxKnob",
  componentId: "sc-1dbk5ju-5"
})(["box-sizing:border-box;position:absolute;top:-", ";left:-", ";transition:all 0.3s;width:", ";height:", ";background:", ";border-radius:", ";", ";"], function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return normalizeColor(props.theme.checkBox.toggle.color[props.theme.dark ? 'dark' : 'light'], props.theme);
}, function (props) {
  return props.theme.checkBox.toggle.radius;
}, function (props) {
  return props.theme.checkBox.toggle.knob.extend;
});
export var StyledCheckBox = styled.div.withConfig({
  displayName: "StyledCheckBox",
  componentId: "sc-1dbk5ju-6"
})(["position:relative;"]);