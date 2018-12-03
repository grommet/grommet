import styled, { css } from 'styled-components';
import { baseStyle } from '../../utils';
import { defaultProps } from '../../default-props';
var fullStyle = css(["width:100vw;height:100vh;overflow:auto;"]);
var StyledGrommet = styled.div.withConfig({
  displayName: "StyledGrommet",
  componentId: "sc-19lkkz7-0"
})(["", " ", " ", " ", ""], function (props) {
  return !props.plain && baseStyle;
}, function (props) {
  return props.full && fullStyle;
}, function (props) {
  return props.theme.global.font.face;
}, function (props) {
  return props.theme.grommet.extend;
});
StyledGrommet.defaultProps = {};
Object.setPrototypeOf(StyledGrommet.defaultProps, defaultProps);
export { StyledGrommet };