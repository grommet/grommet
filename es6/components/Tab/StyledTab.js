import styled, { css } from 'styled-components';
import { Box } from '../Box';
import { genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
var tabHoverStyle = css(["&:hover{", " ", " ", ";}&:focus{z-index:1;}"], function (props) {
  return props.theme.tab.hover.background && css(["background:", ";"], normalizeColor(props.theme.tab.hover.background, props.theme));
}, function (props) {
  return props.theme.tab.hover.color && css(["color:", ";"], normalizeColor(props.theme.tab.hover.color, props.theme));
}, function (props) {
  return props.theme.tab.hover.extend;
});
var StyledTab = styled(Box).withConfig({
  displayName: "StyledTab",
  componentId: "sc-1nnwnsb-0"
})(["white-space:nowrap;", " ", " ", " ", ""], genericStyles, function (props) {
  return !props.plain && !props.disabled && props.theme.tab.hover && tabHoverStyle;
}, function (props) {
  return props.disabled && props.theme.tab.disabled;
}, function (props) {
  return props.theme.tab.extend;
});
StyledTab.defaultProps = {};
Object.setPrototypeOf(StyledTab.defaultProps, defaultProps);
export { StyledTab };