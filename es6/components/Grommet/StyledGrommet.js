import styled, { css } from 'styled-components';
import { normalizeColor } from '../../utils';
import { baseStyle } from '../../styles';
var fullStyle = css(["width:100vw;height:100vh;overflow:auto;"]);
export var StyledGrommet = styled.div.withConfig({
  displayName: "StyledGrommet",
  componentId: "sc-19lkkz7-0"
})(["", " ", " ", " ", " ", ""], function (props) {
  return !props.plain && baseStyle;
}, function (props) {
  return !props.plain && props.theme.global.colors.background && css(["background:", ";color:", ";"], normalizeColor('background', props.theme, true), normalizeColor('text', props.theme, true));
}, function (props) {
  return props.full && fullStyle;
}, function (props) {
  return props.theme.global.font.face;
}, function (props) {
  return props.theme.grommet.extend;
});