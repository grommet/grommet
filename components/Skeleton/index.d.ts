import * as React from 'react';

import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  HeightType,
  PadType,
  PolymorphicType,
  RoundType,
  SkeletonColorsType,
  WidthType,
} from '../../utils';

export interface SkeletonProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: PolymorphicType;
  colors?: SkeletonColorsType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  height?: HeightType;
  pad?: PadType;
  round?: RoundType;
  width?: WidthType;
}

declare const Skeleton: React.FC<SkeletonProps>;

export { Skeleton };
