import React, { forwardRef, useContext } from 'react';
import { SkeletonPropTypes } from './propTypes';
import { useSkeleton } from './SkeletonContext';
import { StyledSkeleton } from './StyledSkeleton';
import { useThemeValue } from '../../utils/useThemeValue';
import { ResponsiveContainerContext } from '../../contexts';

const Skeleton = forwardRef(
  (
    {
      as,
      colors: colorsProp,
      width: widthProp,
      height: heightProp,
      responsive: responsiveProp,
      ...rest
    },
    ref,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();

    const skeleton = useSkeleton();
    const depth = skeleton?.depth || 0;

    const responsiveContainer = useContext(ResponsiveContainerContext);
    const responsive =
      responsiveContainer && responsiveProp ? 'container' : responsiveProp;

    const colors = colorsProp || theme?.skeleton?.colors;
    const themeColors = colors[theme.dark ? 'dark' : 'light'];
    const background = themeColors[(depth + 1) % themeColors.length];

    return (
      <StyledSkeleton
        // Skeletons are purely visual,
        // so we hide them from screen readers
        aria-hidden="true"
        ref={ref}
        as={as}
        background={background}
        widthProp={widthProp}
        heightProp={heightProp}
        responsive={responsive}
        {...passThemeFlag}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
Skeleton.propTypes = SkeletonPropTypes;

export { Skeleton };
