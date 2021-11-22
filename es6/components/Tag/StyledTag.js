import styled from 'styled-components';
import { defaultProps } from '../../default-props';
import { borderStyle, roundStyle } from '../../utils';
import { Button } from '../Button';
export var StyledTagButton = styled(Button).withConfig({
  displayName: "StyledTag__StyledTagButton",
  componentId: "sc-cb9fl2-0"
})(["", " ", ""], function (props) {
  return props.border && borderStyle(props.border, true, props.theme);
}, function (props) {
  return props.round && roundStyle(props.round, true, props.theme);
});
StyledTagButton.defaultProps = {};
Object.setPrototypeOf(StyledTagButton.defaultProps, defaultProps);
export var StyledRemoveButton = styled(Button).withConfig({
  displayName: "StyledTag__StyledRemoveButton",
  componentId: "sc-cb9fl2-1"
})(["", ""], function (props) {
  return props.round && roundStyle(props.round, true, props.theme);
});
StyledRemoveButton.defaultProps = {};
Object.setPrototypeOf(StyledRemoveButton.defaultProps, defaultProps);