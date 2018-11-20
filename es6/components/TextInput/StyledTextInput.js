import styled, { css } from 'styled-components';
import { focusStyle, inputStyle, parseMetricToNum } from '../../utils';
var placeholderColor = css(["color:", ";"], function (props) {
  return props.theme.global.colors.placeholder;
});

var sizeStyle = function sizeStyle(props) {
  var data = props.theme.text[props.size];
  return css(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var plainStyle = css(["border:none;"]);
export var StyledTextInput = styled.input.withConfig({
  displayName: "StyledTextInput",
  componentId: "sc-1x30a0s-0"
})(["", " width:100%;", " ", " &::-webkit-input-placeholder{", ";}&::-moz-placeholder{", ";}&:-ms-input-placeholder{", ";}&::-moz-focus-inner{border:none;outline:none;}", ";", ";"], inputStyle, function (props) {
  return props.size && sizeStyle(props);
}, function (props) {
  return props.plain && plainStyle;
}, placeholderColor, placeholderColor, placeholderColor, function (props) {
  return props.focus && !props.plain && focusStyle;
}, function (props) {
  return props.theme.textInput && props.theme.textInput.extend;
});
export var StyledTextInputContainer = styled.div.withConfig({
  displayName: "StyledTextInput__StyledTextInputContainer",
  componentId: "sc-1x30a0s-1"
})(["position:relative;width:100%;"]);
export var StyledPlaceholder = styled.div.withConfig({
  displayName: "StyledTextInput__StyledPlaceholder",
  componentId: "sc-1x30a0s-2"
})(["position:absolute;left:", "px;top:50%;transform:translateY(-50%);display:flex;justify-content:center;"], function (props) {
  return parseMetricToNum(props.theme.global.spacing) / 2 - parseMetricToNum(props.theme.global.control.border.width);
});
export var StyledSuggestions = styled.ol.withConfig({
  displayName: "StyledTextInput__StyledSuggestions",
  componentId: "sc-1x30a0s-3"
})(["border-top-left-radius:0;border-top-right-radius:0;margin:0;padding:0;list-style-type:none;"]);