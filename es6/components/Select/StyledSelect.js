import styled from 'styled-components';
import { sizeStyle } from 'grommet-styles';
export var StyledContainer = styled.div.withConfig({
  displayName: "StyledSelect__StyledContainer",
  componentId: "znp66n-0"
})(["@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";", ";"], function (props) {
  return props.dropHeight ? sizeStyle('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
}, function (props) {
  return props.theme.select.container && props.theme.select.container.extend;
});