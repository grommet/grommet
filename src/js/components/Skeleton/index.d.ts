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
  WidthType,
} from '../../utils';

interface ColorsType {
  dark?: string[];
  light?: string[];
}
export interface SkeletonProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: PolymorphicType;
  colors?: ColorsType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  height?: HeightType;
  pad?: PadType;
  round?: RoundType;
  width?: WidthType;
}

declare const Skeleton: React.FC<SkeletonProps>;

export { Skeleton };