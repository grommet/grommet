import React from 'react';

import { Box } from '../Box';
import { Text } from '../Text';
import { validEmail, getMd5 } from '../../utils';

const Avatar = ({
  align = 'center',
  children,
  email,
  height, // for warning check and discarding the value
  justify = 'center',
  round = 'full',
  size = 'xxsmall',
  src,
  width, // for warning check and discarding the value
  ...rest
}) => {
  const avatarProps = {
    align,
    email,
    height: size,
    justify,
    overflow: 'hidden',
    round,
    width: size,
  };

  const AvatarChildren = () => (
    <Box {...avatarProps} {...rest}>
      {children}
    </Box>
  );

  if (height || width) {
    console.warn(
      'Avatar should use `size` instead of `height` or `width` props',
    );
  }

  if (email && src) {
    console.warn('Avatar should use either `email` or `src` props, not both.');
  }

  if (email) {
    if (!validEmail(email)) {
      console.warn('Please send a valid email address on the `email` prop.');
      return <AvatarChildren />;
    }
    const emailGravatarUrl =
      validEmail(email) && `url(//s.gravatar.com/avatar/${getMd5(email)})`;

    return (
      <Box
        {...avatarProps}
        {...rest}
        background={emailGravatarUrl || `url(${src})`}
      />
    );
  }

  if (typeof src === 'string') {
    return <Box {...avatarProps} {...rest} background={`url(${src})`} />;
  }
  if (typeof children === 'string') {
    return (
      <Box {...avatarProps} {...rest}>
        <Text alignSelf="center" size="large">
          {children}
        </Text>
      </Box>
    );
  }
  return <AvatarChildren />; // typeof src === 'object'
};

export { Avatar };
