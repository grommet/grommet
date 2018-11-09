import styled, { css } from 'styled-components';
import { genericStyles } from '../../utils';
var roundStyle = css(["border-radius:", ";"], function (props) {
  return props.theme.global.edgeSize[props.round.size];
}); // overflow: hidden is needed for ie11

export var StyledMeter = styled.svg.withConfig({
  displayName: "StyledMeter",
  componentId: "nsxarx-0"
})(["max-width:100%;overflow:hidden;", " ", " path{transition:all 0.3s;}", ";"], genericStyles, function (props) {
  return props.round && roundStyle;
}, function (props) {
  return props.theme.meter && props.theme.meter.extend;
});