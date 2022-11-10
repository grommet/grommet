import styled from 'styled-components';
import { backgroundStyle, edgeStyle, genericStyles, heightStyle, roundStyle, widthStyle } from '../../utils';

// Styling a div directly rather than just using
// a Box since Box itself will react to a SkeletonContext
// and we don't want that here.
export var StyledSkeleton = styled.div.withConfig({
  displayName: "StyledSkeleton",
  componentId: "sc-1omqm6u-0"
})(["display:flex;box-sizing:border-box;", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return props.background && backgroundStyle(props.background, props.theme);
}, function (props) {
  var _props$theme$text, _props$theme$text$med;
  return heightStyle(props.heightProp || ((_props$theme$text = props.theme.text) == null ? void 0 : (_props$theme$text$med = _props$theme$text.medium) == null ? void 0 : _props$theme$text$med.height), props.theme);
}, function (props) {
  return widthStyle(props.widthProp || '100%', props.theme);
}, function (props) {
  return props.pad && edgeStyle('padding', props.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.round && roundStyle(props.round, props.responsive, props.theme);
});