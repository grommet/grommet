import React, { forwardRef } from 'react';

import { Skeleton } from '../Skeleton';
import { useThemeValue } from '../../utils/useThemeValue';

const TextSkeleton = forwardRef(({ as, size: sizeProp, ...rest }, ref) => {
  const theme = useThemeValue();
  const size = sizeProp || 'medium';
  const data = theme.text[size];
  const height = data ? data.size : sizeProp;
  return (
    <Skeleton
      ref={ref}
      as={as}
      height={height}
      {...theme.text.skeleton}
      {...rest}
    />
  );
});

TextSkeleton.displayName = 'TextSkeleton';

export { TextSkeleton };
