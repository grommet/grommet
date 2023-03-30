import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Skeleton } from '../Skeleton';

const HeadingSkeleton = forwardRef(({ as, level, size }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const levelStyle = theme.heading.level[level];
  const data = levelStyle?.[size || 'medium'];
  const height = data ? data.height : size;
  return (
    <Skeleton as={as} ref={ref} height={height} {...theme.heading.skeleton} />
  );
});

HeadingSkeleton.displayName = 'HeadingSkeleton';
HeadingSkeleton.defaultProps = {
  level: 1,
};

export { HeadingSkeleton };
