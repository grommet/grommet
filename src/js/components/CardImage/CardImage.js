import React from 'react';

import { Box } from '../Box';
import { Image } from '../Image';
import { useThemeValue } from '../../utils/useThemeValue';

const CardImage = ({ fit = 'cover', ...rest }) => {
  const { theme } = useThemeValue();

  return (
    <Box overflow="hidden" flex={false} {...theme.card?.image}>
      <Image fit={fit} fill="horizontal" {...rest} />
    </Box>
  );
};

export { CardImage };
