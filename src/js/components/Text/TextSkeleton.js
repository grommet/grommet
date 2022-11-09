import React, { forwardRef, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Skeleton } from '../Skeleton';

const TextSkeleton = forwardRef(({ as, size: sizeProp, ...rest }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
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
