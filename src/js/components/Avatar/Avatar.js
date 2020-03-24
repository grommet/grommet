import React from 'react';

import { Box } from '../Box';
import { Text } from '../Text';

const Avatar = ({
  align = 'center',
  children,
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
