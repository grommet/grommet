import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { getDefaultProps } from '../../default-props';

const StyledAvatarText = styled(Text).attrs(getDefaultProps)`
  ${props =>
    props.theme.avatar &&
    props.theme.avatar.text &&
    props.theme.avatar.text.fontWeight &&
    `font-weight: ${props.theme.avatar.text.fontWeight};`}
  ${props => props.theme.avatar.text && props.theme.avatar.text.extend}
`;

const StyledAvatar = styled(Box).attrs(getDefaultProps)`
  ${props => props.theme.avatar && props.theme.avatar.extend}
`;

export { StyledAvatar, StyledAvatarText };
