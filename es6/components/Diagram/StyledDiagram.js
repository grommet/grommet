import styled from 'styled-components';
import { defaultProps } from '../../default-props';
var StyledDiagram = styled.svg.withConfig({
  displayName: "StyledDiagram",
  componentId: "sc-1vzeu9f-0"
})(["max-width:100%;width:100%;height:100%;", ";"], function (props) {
  return props.theme.diagram && props.theme.diagram.extend;
});
StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, defaultProps);
export { StyledDiagram };