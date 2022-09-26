import React, { useCallback, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';

import { Image } from '../Image';
import { defaultProps } from '../../default-props';
import { StyledAvatar, StyledAvatarText } from './StyledAvatar';
import { AvatarPropTypes } from './propTypes';

const Avatar = ({
  a11yTitle,
  'aria-label': ariaLabel,
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
  const avatarTextSize = theme.avatar.text.size[size] || 'large';

  const avatarProps = useMemo(
    () => ({
      align,
      height: avatarSize,
      justify,
      overflow: 'hidden',
      round,
      width: avatarSize,
    }),
    [align, avatarSize, justify, round],
  );

  const AvatarChildren = useCallback(
    () => (
      <StyledAvatar {...avatarProps} {...rest}>
        {children}
      </StyledAvatar>
    ),
    [avatarProps, children, rest],
  );

  if (height || width) {
    console.warn(
      'Avatar should use `size` instead of `height` or `width` props',
    );
  }

  if (typeof src === 'string') {
    return (
      <StyledAvatar {...avatarProps} {...rest}>
        <Image a11yTitle={a11yTitle || ariaLabel} fit="contain" src={src} />
      </StyledAvatar>
    );
  }
  if (typeof children === 'string') {
    return (
      <StyledAvatar
        a11yTitle={a11yTitle || ariaLabel}
        {...avatarProps}
        {...rest}
      >
        <StyledAvatarText alignSelf="center" size={avatarTextSize}>
          {children}
        </StyledAvatarText>
      </StyledAvatar>
    );
  }
  return <AvatarChildren />;
};

Avatar.propTypes = AvatarPropTypes;
export { Avatar };
