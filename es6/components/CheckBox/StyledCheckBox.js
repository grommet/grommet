import styled, { css } from 'styled-components';
import { edgeStyle, focusStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props'; // Note: since `fillStyle` is only used in one place, `justify-content` was
// added to it to simplify its logic. If this is ever reused somewhere else,
// consider the need of separating those once again.

var fillStyle = function fillStyle() {
  return "\n      width: 100%;\n      height: 100%;\n      max-width: none;\n      flex: 1 0 auto;\n      justify-content: space-between;\n    ";
};

var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var hoverStyle = css([":hover input:not([disabled]) + div,:hover input:not([disabled]) + span{border-color:", ";}:hover{background-color:", ";}"], function (props) {
  var _props$theme$checkBox, _props$theme$checkBox2;

  return normalizeColor((_props$theme$checkBox = props.theme.checkBox.hover) == null ? void 0 : (_props$theme$checkBox2 = _props$theme$checkBox.border) == null ? void 0 : _props$theme$checkBox2.color, props.theme);
}, function (props) {
  var _props$theme$checkBox3, _props$theme$checkBox4;

  return normalizeColor(!props.disabled && ((_props$theme$checkBox3 = props.theme.checkBox.hover) == null ? void 0 : (_props$theme$checkBox4 = _props$theme$checkBox3.background) == null ? void 0 : _props$theme$checkBox4.color), props.theme);
});
var StyledCheckBoxIcon = styled.svg.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxIcon",
  componentId: "sc-1dbk5ju-0"
})(["box-sizing:border-box;stroke-width:", ";stroke:", ";width:", ";height:", ";", ";"], function (props) {
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
StyledCheckBoxIcon.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxIcon.defaultProps, defaultProps);
var StyledCheckBoxContainer = styled.label.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxContainer",
  componentId: "sc-1dbk5ju-1"
})(["display:flex;flex-direction:row;align-items:", ";user-select:none;", " ", " ", " ", " ", " ", " ", ""], function (props) {
  return props.theme.checkBox.label.align;
}, function (props) {
  return props.fillProp ? fillStyle() : 'width: fit-content;';
}, function (props) {
  return (props.pad || props.theme.checkBox.pad) && edgeStyle('padding', props.pad || props.theme.checkBox.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, hoverStyle, function (props) {
  var _props$theme$checkBox5, _props$theme$checkBox6, _props$theme$checkBox7, _props$theme$checkBox8;

  return props.focus && !props.focusIndicator && "\n    input:not([disabled]) + div,\n    input:not([disabled]) + span {\n      border-color: " + normalizeColor((_props$theme$checkBox5 = props.theme.checkBox.hover) == null ? void 0 : (_props$theme$checkBox6 = _props$theme$checkBox5.border) == null ? void 0 : _props$theme$checkBox6.color, props.theme) + ";\n    }\n     \n    background-color: " + normalizeColor(!props.disabled && ((_props$theme$checkBox7 = props.theme.checkBox.hover) == null ? void 0 : (_props$theme$checkBox8 = _props$theme$checkBox7.background) == null ? void 0 : _props$theme$checkBox8.color), props.theme) + ";";
}, function (props) {
  return props.theme.checkBox.extend;
});
StyledCheckBoxContainer.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxContainer.defaultProps, defaultProps);
var StyledCheckBoxInput = styled.input.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxInput",
  componentId: "sc-1dbk5ju-2"
})(["opacity:0;-moz-appearance:none;width:0;height:0;margin:0;", ":checked + span > span{left:calc( ", " - ", " );background:", ";}"], function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return props.theme.checkBox.toggle.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return normalizeColor(props.theme.checkBox.color || 'control', props.theme);
});
StyledCheckBoxInput.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxInput.defaultProps, defaultProps);
var StyledCheckBoxBox = styled.div.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxBox",
  componentId: "sc-1dbk5ju-3"
})(["", ";", ";"], function (props) {
  return props.focus && props.focusIndicator && focusStyle();
}, function (props) {
  return props.theme.checkBox.check.extend;
});
StyledCheckBoxBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxBox.defaultProps, defaultProps);
var StyledCheckBoxToggle = styled.span.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxToggle",
  componentId: "sc-1dbk5ju-4"
})(["box-sizing:border-box;vertical-align:middle;display:inline-block;width:", ";height:", ";border:", " solid;border-color:", ";border-radius:", ";background-color:", ";", ";", ";"], function (props) {
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
  return props.focus && props.focusIndicator && focusStyle();
}, function (props) {
  return props.theme.checkBox.toggle.extend;
});
StyledCheckBoxToggle.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxToggle.defaultProps, defaultProps);
var StyledCheckBoxKnob = styled.span.withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxKnob",
  componentId: "sc-1dbk5ju-5"
})(["box-sizing:border-box;position:relative;display:inherit;top:-", ";left:-", ";transition:all 0.3s;width:", ";height:", ";background:", ";border-radius:", ";", ";"], function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return normalizeColor(props.theme.checkBox.toggle.color, props.theme);
}, function (props) {
  return props.theme.checkBox.toggle.radius;
}, function (props) {
  return props.theme.checkBox.toggle.knob.extend;
});
StyledCheckBoxKnob.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxKnob.defaultProps, defaultProps);
var StyledCheckBox = styled.div.withConfig({
  displayName: "StyledCheckBox",
  componentId: "sc-1dbk5ju-6"
})(["flex-shrink:0;"]);
StyledCheckBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBox.defaultProps, defaultProps);
export { StyledCheckBoxIcon, StyledCheckBoxContainer, StyledCheckBoxInput, StyledCheckBoxBox, StyledCheckBoxToggle, StyledCheckBoxKnob, StyledCheckBox };