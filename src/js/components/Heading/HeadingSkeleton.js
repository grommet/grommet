import React, { forwardRef } from 'react';
import { Skeleton } from '../Skeleton';
import { useThemeValue } from '../../utils/useThemeValue';

const HeadingSkeleton = forwardRef(({ as, level = 1, size }, ref) => {
  const theme = useThemeValue();

  const levelStyle = theme.heading.level[level];
  const data = levelStyle?.[size || 'medium'];
  const height = data ? data.height : size;
  return (
    <Skeleton as={as} ref={ref} height={height} {...theme.heading.skeleton} />
  );
});

HeadingSkeleton.displayName = 'HeadingSkeleton';

export { HeadingSkeleton };
