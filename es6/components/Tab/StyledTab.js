import styled, { css } from 'styled-components';
import { genericStyles, normalizeColor } from '../../utils';
var tabHoverStyle = css(["&:hover{", " ", " ", ";}"], function (props) {
  return props.theme.tab.hover.background && css(["background:", ";"], normalizeColor(props.theme.tab.hover.background, props.theme));
}, function (props) {
  return props.theme.tab.hover.color && css(["color:", ";"], normalizeColor(props.theme.tab.hover.color, props.theme));
}, function (props) {
  return props.theme.tab.hover.extend;
});
export var StyledTab = styled.div.withConfig({
  displayName: "StyledTab",
  componentId: "sc-1nnwnsb-0"
})(["", " ", " ", ""], genericStyles, function (props) {
  return !props.plain && props.theme.tab.hover && tabHoverStyle;
}, function (props) {
  return props.theme.tab.extend;
});