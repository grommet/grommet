import React from 'react';

import { Box } from '../Box';

const Avatar = ({
  align = 'center',
  round = 'full',
  size = 'xxsmall',
  justify = 'center',
  src,
  height, // for warning check and discarding the value
  width, // for warning check and discarding the value
  ...rest
}) => {
  const avatarProps = {
    align,
    justify,
    height: size,
    round,
    width: size,
  };

  if (height || width) {
    console.warn(
      'Avatar should use `size` instead of `height` or `width` props',
    );
  }
  return typeof src === 'function' || typeof src === 'object' ? (
    <Box {...avatarProps} {...rest}>
      {src}
    </Box>
  ) : (
    <Box {...avatarProps} background={`url(${src})`} {...rest} />
  );
};

export { Avatar };
