import styled, { css } from 'styled-components';
import { controlBorderStyle, disabledStyle, getInputPadBySide, inputStyle, parseMetricToNum, plainInputStyle, textAlignStyle, widthStyle, styledComponentsConfig } from '../../utils';
import { inputPadForIcon } from '../../utils/styles';
import { readOnlyStyle } from '../../utils/readOnly';
var getPlainStyle = function getPlainStyle(plain) {
  if (plain === 'full') {
    return css(["", " padding:0;"], plainInputStyle);
  }
  return plain && plainInputStyle;
};
var StyledTextInput = styled.input.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput",
  componentId: "sc-1x30a0s-0"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", ";"], inputStyle, function (props) {
  return props.readOnlyCopy ? "padding-" + (props.reverse ? 'left' : 'right') + ": 0px;" : '';
}, function (props) {
  return props.readOnly && "border: none;";
}, function (props) {
  return getPlainStyle(props.plain);
}, function (props) {
  return props.icon && inputPadForIcon;
}, function (props) {
  return props.disabled && disabledStyle(props.theme.textInput.disabled && props.theme.textInput.disabled.opacity);
}, function (props) {
  return props.textAlign && textAlignStyle;
}, function (props) {
  return props.widthProp && widthStyle(props.widthProp, props.theme);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.extend;
});
var StyledTextInputContainer = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledTextInputContainer",
  componentId: "sc-1x30a0s-1"
})(["position:relative;width:100%;", ";", ";", " ", ";"], function (props) {
  return props.readOnlyProp && !props.plain && controlBorderStyle;
}, function (props) {
  return props.readOnlyCopy && "\n    box-sizing: border-box;\n    flex-direction: row;\n    display: flex;\n  ";
}, function (props) {
  return props.readOnlyProp && !props.plain && readOnlyStyle(props.theme);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.container && props.theme.textInput.container.extend;
});
var StyledPlaceholder = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledPlaceholder",
  componentId: "sc-1x30a0s-2"
})(["position:absolute;left:", "px;top:50%;transform:translateY(-50%);display:flex;justify-content:center;pointer-events:none;", ";"], function (props) {
  return parseMetricToNum(getInputPadBySide(props, 'left')) - parseMetricToNum(props.theme.global.control.border.width);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.placeholder && props.theme.textInput.placeholder.extend;
});
var StyledIcon = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledIcon",
  componentId: "sc-1x30a0s-3"
})(["position:absolute;display:flex;justify:center;top:50%;transform:translateY(-50%);pointer-events:none;", ""], function (props) {
  return props.reverse ? "right: " + getInputPadBySide(props, 'right') + ";" : "left: " + getInputPadBySide(props, 'left') + ";";
});
var StyledSuggestions = styled.ol.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledSuggestions",
  componentId: "sc-1x30a0s-4"
})(["border-top-left-radius:0;border-top-right-radius:0;margin:0;padding:0;list-style-type:none;", ";"], function (props) {
  return props.theme.textInput && props.theme.textInput.suggestions && props.theme.textInput.suggestions.extend;
});
export { StyledTextInput, StyledTextInputContainer, StyledPlaceholder, StyledIcon, StyledSuggestions };