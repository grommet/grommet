import React, { useCallback, useMemo } from 'react';

import { Image } from '../Image';
import { StyledAvatar, StyledAvatarText } from './StyledAvatar';
import { AvatarPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const Avatar = ({
  a11yTitle,
  'aria-label': ariaLabel,
  align = 'center',
  children,
  height, // for warning check and discarding the value
  imageProps,
  justify = 'center',
  round = 'full',
  size = 'medium',
  src,
  width, // for warning check and discarding the value
  ...rest
}) => {
  const { theme, passThemeFlag } = useThemeValue();
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

  let content;
  if (typeof children === 'string') {
    content = (
      <StyledAvatarText
        alignSelf="center"
        size={avatarTextSize}
        {...passThemeFlag}
      >
        {children}
      </StyledAvatarText>
    );
  } else if (typeof src === 'string') {
    content = (
      <Image role="presentation" fit="contain" src={src} {...imageProps} />
    );
  }

  if (typeof children === 'string' || typeof src === 'string') {
    return (
      <StyledAvatar
        role={typeof src === 'string' ? 'figure' : undefined}
        a11yTitle={a11yTitle || ariaLabel}
        {...avatarProps}
        {...passThemeFlag}
        {...rest}
      >
        {content}
      </StyledAvatar>
    );
  }

  return <AvatarChildren />;
};

Avatar.propTypes = AvatarPropTypes;
export { Avatar };
