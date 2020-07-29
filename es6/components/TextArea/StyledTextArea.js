import styled, { css } from 'styled-components';
import { disabledStyle, inputStyle } from '../../utils';
import { defaultProps } from '../../default-props';
var plainStyle = css(["outline:none;border:none;width:100%;-webkit-appearance:none;"]);

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
})(["", " ", " ", " ", " ", " ", ";"], inputStyle, function (props) {
  return props.resize !== undefined && resizeStyle(props.resize);
}, function (props) {
  return props.fillArg && 'height: 100%;';
}, function (props) {
  return props.plain && plainStyle;
}, function (props) {
  return props.disabled && disabledStyle(props.theme.textArea.disabled && props.theme.textArea.disabled.opacity);
}, function (props) {
  return props.theme.textArea && props.theme.textArea.extend;
});
StyledTextArea.defaultProps = {};
Object.setPrototypeOf(StyledTextArea.defaultProps, defaultProps);
export { StyledTextArea };