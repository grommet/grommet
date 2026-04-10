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
      <StyledAvatar
        aria-label={a11yTitle || ariaLabel || undefined}
        {...avatarProps}
        {...rest}
      >
        {children}
      </StyledAvatar>
    ),
    [a11yTitle, ariaLabel, avatarProps, children, rest],
  );

  if (height || width) {
    console.warn(
      'Avatar should use `size` instead of `height` or `width` props',
    );
  }

  let content;
  let hasImage = false;
  if (typeof children === 'string') {
    content = (
      <StyledAvatarText
        alignSelf="center"
        aria-label={a11yTitle || ariaLabel || undefined}
        size={avatarTextSize}
        {...passThemeFlag}
      >
        {children}
      </StyledAvatarText>
    );
  } else if (typeof src === 'string') {
    hasImage = true;
    content = (
      <Image
        alt={a11yTitle || ariaLabel || ''}
        fit="contain"
        src={src}
        {...imageProps}
      />
    );
  }

  if (typeof children === 'string' || typeof src === 'string') {
    return (
      <StyledAvatar
        aria-label={hasImage ? undefined : a11yTitle || ariaLabel || undefined}
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
