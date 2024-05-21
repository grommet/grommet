import styled from 'styled-components';
import { inputStyle, styledComponentsConfig } from '../../utils';
import { defaultProps } from '../../default-props';
var StyledFileInput = styled.input.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledFileInput",
  componentId: "sc-rl7ywv-0"
})(["position:absolute;height:100%;width:100%;", " font-size:0;opacity:0;border:none;", " ", " &::-moz-focus-inner{border:none;outline:none;}&::-webkit-file-upload-button{cursor:pointer;}"], inputStyle, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return props.rightOffset && "\n    width: calc(100% - " + props.rightOffset + "px);\n    right: " + props.rightOffset + "px;\n    ";
});
StyledFileInput.defaultProps = {};
Object.setPrototypeOf(StyledFileInput.defaultProps, defaultProps);
export { StyledFileInput };