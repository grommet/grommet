import styled, { css, keyframes } from 'styled-components';
import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

var animateStyle = function animateStyle(_ref) {
  var theme = _ref.theme,
      typeProp = _ref.typeProp;
  var animateBounds;
  if (typeProp === 'line') // 200% allows the line to be squiggly
    animateBounds = ['stroke-dashoffset: 200%;', 'stroke-dashoffset: 0%;'];else if (typeProp === 'point') animateBounds = ['opacity: 0;', 'opacity: 1;'];else animateBounds = ['transform: scaleY(0);', 'transform: scaleY(1);'];
  return css(["", " animation:", " ", " forwards;", ""], typeProp === 'line' && 'stroke-dasharray: 200%;', keyframes(["from{", "}to{", "}"], animateBounds[0], animateBounds[1]), theme.global.animation.duration, (typeProp === 'bar' || typeProp === 'area') && 'transform-origin: center bottom 0;');
};

var StyledChart = styled.svg.withConfig({
  displayName: "StyledChart",
  componentId: "sc-1nae0gf-0"
})(["display:block;max-width:100%;overflow:visible;", " ", " ", ";"], genericStyles, function (props) {
  return props.animate && animateStyle(props);
}, function (props) {
  return props.theme.chart && props.theme.chart.extend;
});
StyledChart.defaultProps = {};
Object.setPrototypeOf(StyledChart.defaultProps, defaultProps);
export { StyledChart };