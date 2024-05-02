import { Box } from '../Box';
import { Text } from '../Text';
import { styledWithTheme } from '../styledWithTheme';

const StyledAvatarText = styledWithTheme(Text)`
  ${props =>
    props.theme.avatar &&
    props.theme.avatar.text &&
    props.theme.avatar.text.fontWeight &&
    `font-weight: ${props.theme.avatar.text.fontWeight};`}
  ${props => props.theme.avatar.text && props.theme.avatar.text.extend}
`;

const StyledAvatar = styledWithTheme(Box)`
  ${props => props.theme.avatar && props.theme.avatar.extend}
`;

export { StyledAvatar, StyledAvatarText };
