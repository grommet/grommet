import styled from 'styled-components';
import { genericStyles } from '../../utils';
export var StyledChart = styled.svg.withConfig({
  displayName: "StyledChart",
  componentId: "sc-1nae0gf-0"
})(["display:block;max-width:100%;overflow:visible;", " ", ";"], genericStyles, function (props) {
  return props.theme.chart && props.theme.chart.extend;
});