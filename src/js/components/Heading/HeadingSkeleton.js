import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Skeleton } from '../Skeleton';


const HeadingSkeleton = forwardRef(
  (
    props,

    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;

    const levelStyle = theme.heading.level[props.level];
    const data = levelStyle?.[props.size || 'medium'];
    const height = data ? data.height : props.size;
    return (
      <Skeleton
        as={props.as}
        ref={ref}
        height={height}
        {...theme.heading.skeleton}
      />
    );
  },
);

HeadingSkeleton.displayName = 'HeadingSkeleton';
HeadingSkeleton.defaultProps = {
  level: 1,
};

export { HeadingSkeleton };
