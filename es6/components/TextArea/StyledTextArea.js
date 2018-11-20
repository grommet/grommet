import styled, { css } from 'styled-components';
import { focusStyle, inputStyle } from '../../utils';
var placeholderColor = css(["color:", ";"], function (props) {
  return props.theme.global.colors.placeholder;
});
var plainStyle = css(["border:none;width:100%;-webkit-appearance:none;"]);
export var StyledTextArea = styled.textarea.withConfig({
  displayName: "StyledTextArea",
  componentId: "sc-17i3mwp-0"
})(["", " width:100%;", " ", " &::-webkit-input-placeholder{", ";}&::-moz-placeholder{", ";}&:-ms-input-placeholder{", ";}&::-moz-focus-inner{border:none;outline:none;}", ";", ";"], inputStyle, function (props) {
  return props.fillArg && 'height: 100%;';
}, function (props) {
  return props.plain && plainStyle;
}, placeholderColor, placeholderColor, placeholderColor, function (props) {
  return props.focus && !props.plain && focusStyle;
}, function (props) {
  return props.theme.textArea && props.theme.textArea.extend;
});