import styled from 'styled-components';
import { inputStyle } from '../../utils';
import { defaultProps } from '../../default-props';
var StyledFileInput = styled.input.withConfig({
  displayName: "StyledFileInput",
  componentId: "rl7ywv-0"
})(["position:absolute;height:100%;width:100%;", " opacity:0;border:none;", " ", " &::-moz-focus-inner{border:none;outline:none;}"], inputStyle, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return props.rightOffset && "\n    width: calc(100% - " + props.rightOffset + "px);\n    right: " + props.rightOffset + "px;\n    ";
});
StyledFileInput.defaultProps = {};
Object.setPrototypeOf(StyledFileInput.defaultProps, defaultProps);
export { StyledFileInput };