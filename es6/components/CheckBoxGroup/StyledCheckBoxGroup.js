import styled from 'styled-components';
import { Box } from '../Box';
import { defaultProps } from '../../default-props';
var StyledCheckBoxGroup = styled(Box).withConfig({
  displayName: "StyledCheckBoxGroup",
  componentId: "sc-2nhc5d-0"
})(["", ""], function (props) {
  return props.theme.checkBoxGroup && props.theme.checkBoxGroup.container && props.theme.checkBoxGroup.container.extend;
});
StyledCheckBoxGroup.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxGroup.defaultProps, defaultProps);
export { StyledCheckBoxGroup };