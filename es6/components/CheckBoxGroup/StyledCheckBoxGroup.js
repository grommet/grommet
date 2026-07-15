import styled from 'styled-components';
import { Box } from '../Box';
var StyledCheckBoxGroup = styled(Box).withConfig({
  displayName: "StyledCheckBoxGroup",
  componentId: "sc-2nhc5d-0"
})(["", ""], function (props) {
  return props.theme.checkBoxGroup && props.theme.checkBoxGroup.container && props.theme.checkBoxGroup.container.extend;
});
export { StyledCheckBoxGroup };