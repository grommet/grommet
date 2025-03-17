import React, { forwardRef } from 'react';
import { Skeleton } from '../Skeleton';
import { useThemeValue } from '../../utils/useThemeValue';

const HeadingSkeleton = forwardRef(
  ({ as, level = 1, size = 'medium', responsive }, ref) => {
    const { theme } = useThemeValue();

    const height = theme.heading.level[level]?.[size]?.height || size;

    let responsiveSize;
    if (responsive && theme.heading.responsiveBreakpoint) {
      const breakpoint =
        theme.global.breakpoints[theme.heading.responsiveBreakpoint];
      if (breakpoint) {
        const responsiveHeight = theme.heading.level[level + 1]
          ? theme.heading.level[level + 1][size]?.height
          : theme.heading.level[level][size]?.height;

        responsiveSize = {
          breakpoint,
          height: responsiveHeight || height,
        };
      }
    }

    return (
      <Skeleton
        as={as}
        ref={ref}
        height={height}
        responsive={responsive}
        responsiveSize={responsiveSize}
        {...theme.heading.skeleton}
      />
    );
  },
);

HeadingSkeleton.displayName = 'HeadingSkeleton';

export { HeadingSkeleton };
