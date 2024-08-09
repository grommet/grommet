import React, { forwardRef } from 'react';

import { Skeleton } from '../Skeleton';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

const ParagraphSkeleton = forwardRef(({ fill, size: sizeProp }, ref) => {
  const theme = useThemeValue();
  const size = sizeProp || 'medium';
  const data = theme.paragraph[size];
  const height = data ? data.size : size;
  return (
    <Box
      ref={ref}
      gap="xsmall"
      width={{ max: fill ? 'none' : data && data.maxWidth }}
    >
      <Skeleton height={height} />
      <Skeleton height={height} />
      <Skeleton height={height} width="30%" />
    </Box>
  );
});

ParagraphSkeleton.displayName = 'ParagraphSkeleton';

export { ParagraphSkeleton };
