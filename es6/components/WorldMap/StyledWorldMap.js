import styled from 'styled-components';
import { genericStyles } from '../../utils';
export var StyledWorldMap = styled.svg.withConfig({
  displayName: "StyledWorldMap",
  componentId: "had4c3-0"
})(["width:100%;", " ", ";"], genericStyles, function (props) {
  return props.theme.worldMap && props.theme.worldMap.extend;
});