import styled from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Text } from '../Text';

const StyledAvatarText = styled(Text)`
  ${props =>
    props.theme.avatar &&
    props.theme.avatar.text &&
    props.theme.avatar.text.fontWeight &&
    `font-weight: ${props.theme.avatar.text.fontWeight};`}
  ${props => props.theme.avatar.text && props.theme.avatar.text.extend}
`;

StyledAvatarText.defaultProps = {};
Object.setPrototypeOf(StyledAvatarText.defaultProps, defaultProps);

const StyledAvatar = styled(Box)`
  ${props => props.theme.avatar && props.theme.avatar.extend}
`;

StyledAvatar.defaultProps = {};
Object.setPrototypeOf(StyledAvatar.defaultProps, defaultProps);

export { StyledAvatar, StyledAvatarText };
