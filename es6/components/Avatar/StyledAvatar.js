import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { withTheme } from '../../default-props';
var StyledAvatarText = styled(Text).attrs(withTheme).withConfig({
  displayName: "StyledAvatar__StyledAvatarText",
  componentId: "sc-1suyamb-0"
})(["", " ", ""], function (props) {
  return props.theme.avatar && props.theme.avatar.text && props.theme.avatar.text.fontWeight && "font-weight: " + props.theme.avatar.text.fontWeight + ";";
}, function (props) {
  return props.theme.avatar.text && props.theme.avatar.text.extend;
});
var StyledAvatar = styled(Box).attrs(withTheme).withConfig({
  displayName: "StyledAvatar",
  componentId: "sc-1suyamb-1"
})(["", ""], function (props) {
  return props.theme.avatar && props.theme.avatar.extend;
});
export { StyledAvatar, StyledAvatarText };