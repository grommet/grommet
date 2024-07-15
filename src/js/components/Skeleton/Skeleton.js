import React, { forwardRef } from 'react';
import { SkeletonPropTypes } from './propTypes';
import { useSkeleton } from './SkeletonContext';
import { StyledSkeleton } from './StyledSkeleton';
import { useThemeValue } from '../../utils/useThemeValue';

const Skeleton = forwardRef(
  (
    { as, colors: colorsProp, width: widthProp, height: heightProp, ...rest },
    ref,
  ) => {
    const theme = useThemeValue();

    const skeleton = useSkeleton();
    const depth = skeleton?.depth || 0;

    const colors = colorsProp || theme?.skeleton?.colors;
    const themeColors = colors[theme.dark ? 'dark' : 'light'];
    const background = themeColors[(depth + 1) % themeColors.length];

    return (
      <StyledSkeleton
        ref={ref}
        as={as}
        background={background}
        widthProp={widthProp}
        heightProp={heightProp}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
Skeleton.propTypes = SkeletonPropTypes;

export { Skeleton };
