import styled from 'styled-components';
import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';
var StyledWorldMap = styled.svg.withConfig({
  displayName: "StyledWorldMap",
  componentId: "had4c3-0"
})(["width:100%;", " ", ";"], genericStyles, function (props) {
  return props.theme.worldMap && props.theme.worldMap.extend;
});
StyledWorldMap.defaultProps = {};
Object.setPrototypeOf(StyledWorldMap.defaultProps, defaultProps);
export { StyledWorldMap };