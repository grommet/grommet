import React, { forwardRef } from 'react';

import { SkeletonPropTypes } from './propTypes';
import { useSkeleton } from './SkeletonContext';
import { StyledSkeleton } from './StyledSkeleton';

const Skeleton = forwardRef(
  (
    {
      kind,
      ...rest
    },
    ref,
  ) => {
    const skeleton = useSkeleton();
    console.log('Skeleton', skeleton);
    return (
      <StyledSkeleton
        ref={ref}
        kind={kind}
        skeleton={skeleton}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
Skeleton.defaultProps = {
  kind: 'text',
};
Skeleton.propTypes = SkeletonPropTypes;

export { Skeleton };
