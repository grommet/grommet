import React, { forwardRef, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Skeleton } from '../Skeleton';
import { Box } from '../Box';

const ParagraphSkeleton = forwardRef(({ fill, size: sizeProp }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
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
