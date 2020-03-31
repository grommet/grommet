import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { StyledAvatar, StyledAvatarText } from './StyledAvatar';

const Avatar = ({
  align = 'center',
  children,
  height, // for warning check and discarding the value
  justify = 'center',
  round = 'full',
  size = 'medium',
  src,
  width, // for warning check and discarding the value
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const avatarSize = theme.avatar.size[size] || size;

  const avatarProps = {
    align,
    height: avatarSize,
    justify,
    overflow: 'hidden',
    round,
    width: avatarSize,
  };

  const AvatarChildren = () => (
    <StyledAvatar {...avatarProps} {...rest}>
      {children}
    </StyledAvatar>
  );

  if (height || width) {
    console.warn(
      'Avatar should use `size` instead of `height` or `width` props',
    );
  }

  if (typeof src === 'string') {
    return (
      <StyledAvatar {...avatarProps} {...rest} background={`url(${src})`} />
    );
  }
  if (typeof children === 'string') {
    return (
      <StyledAvatar {...avatarProps} {...rest}>
        <StyledAvatarText alignSelf="center" size="large">
          {children}
        </StyledAvatarText>
      </StyledAvatar>
    );
  }
  return <AvatarChildren />;
};

export { Avatar };
