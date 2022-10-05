import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { SkeletonPropTypes } from './propTypes';
import { useSkeleton } from './SkeletonContext';
import { StyledSkeleton } from './StyledSkeleton';

const Skeleton = forwardRef(
  (
    {
      colors: colorsProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;

    const skeleton = useSkeleton();
    const depth = skeleton?.depth || 0;

    const colors = colorsProp || theme?.skeleton?.colors;
    const themeColors = colors[theme.dark ? 'dark' : 'light'];
    const background =  themeColors[(depth + 1) % themeColors.length];

    return (
      <StyledSkeleton
        ref={ref}
        background={background}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
Skeleton.propTypes = SkeletonPropTypes;

export { Skeleton };
