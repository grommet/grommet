import styled, { css } from 'styled-components';
import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';
var roundStyle = css(["border-radius:", ";"], function (props) {
  return props.theme.global.edgeSize[props.round.size];
}); // overflow: hidden is needed for ie11

var StyledMeter = styled.svg.withConfig({
  displayName: "StyledMeter",
  componentId: "nsxarx-0"
})(["max-width:100%;overflow:hidden;", " ", " path{transition:stroke 0.3s,stroke-width 0.3s;}", ";"], genericStyles, function (props) {
  return props.round && roundStyle;
}, function (props) {
  return props.theme.meter && props.theme.meter.extend;
});
StyledMeter.defaultProps = {};
Object.setPrototypeOf(StyledMeter.defaultProps, defaultProps);
export { StyledMeter };