import React, { forwardRef } from 'react';

import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

const Card = forwardRef(({ ...rest }, ref) => {
  const theme = useThemeValue();

  return (
    <Box
      overflow="hidden"
      kind={{
        hover: theme.card.hover?.container,
        ...theme.card.container,
      }}
      ref={ref}
      {...theme.card.container}
      {...rest}
    />
  );
});

Card.displayName = 'Card';

export { Card };
