import * as React from 'react';

export interface SkeletonProps {
  kind?: string;
}

declare const Skeleton: React.FC<SkeletonProps>;

export { Skeleton };