import styled, { css } from 'styled-components';
import { disabledStyle, focusStyle, inputStyle, placeholderStyle } from '../../utils';
import { defaultProps } from '../../default-props';
var plainStyle = css(["border:none;width:100%;-webkit-appearance:none;"]);

var resizeStyle = function resizeStyle(resize) {
  if (resize === 'horizontal') {
    return 'resize: horizontal;';
  }

  if (resize === 'vertical') {
    return 'resize: vertical;';
  }

  if (resize) {
    return 'resize: both;';
  }

  return 'resize: none;';
};

var StyledTextArea = styled.textarea.withConfig({
  displayName: "StyledTextArea",
  componentId: "sc-17i3mwp-0"
})(["", " width:100%;", " ", " ", " ", " ", " &::-moz-focus-inner{border:none;outline:none;}", ";", ";"], inputStyle, function (props) {
  return props.resize !== undefined && resizeStyle(props.resize);
}, function (props) {
  return props.fillArg && 'height: 100%;';
}, function (props) {
  return props.plain && plainStyle;
}, function (props) {
  return props.disabled && disabledStyle(props.theme.textArea.disabled && props.theme.textArea.disabled.opacity);
}, placeholderStyle, function (props) {
  return props.focus && !props.plain && focusStyle;
}, function (props) {
  return props.theme.textArea && props.theme.textArea.extend;
});
StyledTextArea.defaultProps = {};
Object.setPrototypeOf(StyledTextArea.defaultProps, defaultProps);
export { StyledTextArea };