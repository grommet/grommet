import styled from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Text } from '../Text';

const sizeStyle = props => {
  return props.theme.avatar.size[props.size] || props.size;
};

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
  height: ${props => sizeStyle(props)};
  width: ${props => sizeStyle(props)};
  ${props => props.theme.avatar && props.theme.avatar.extend}
`;

StyledAvatar.defaultProps = {};
Object.setPrototypeOf(StyledAvatar.defaultProps, defaultProps);

export { StyledAvatar, StyledAvatarText };
