import * as React from 'react';
import {
  A11yTitleType,
  AlignType,
  AlignContentType,
  AlignSelfType,
  BackgroundType,
  BasisType,
  BorderType,
  DirectionType,
  ElevationType,
  FillType,
  GapType,
  GridAreaType,
  HeightType,
  MarginType,
  PadType,
  PolymorphicType,
  RoundType,
  WidthType,
  AnimationType,
  SkeletonType,
} from '../../utils';

export interface BoxProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  align?: AlignType;
  alignContent?: AlignContentType;
  animation?: AnimationType;
  background?: BackgroundType;
  basis?: BasisType;
  border?: BorderType;
  direction?: DirectionType;
  elevation?: ElevationType;
  flex?: 'grow' | 'shrink' | boolean | { grow?: number; shrink?: number };
  fill?: FillType;
  focusIndicator?: boolean;
  gap?: GapType;
  height?: HeightType;
  hoverIndicator?:
    | { background?: BackgroundType; elevation?: ElevationType }
    | BackgroundType
    | boolean;
  justify?:
    | 'around'
    | 'between'
    | 'center'
    | 'end'
    | 'evenly'
    | 'start'
    | 'stretch';
  onClick?: (event: React.MouseEvent) => void;
  overflow?:
    | 'auto'
    | 'hidden'
    | 'scroll'
    | 'visible'
    | {
        horizontal?: 'auto' | 'hidden' | 'scroll' | 'visible';
        vertical?: 'auto' | 'hidden' | 'scroll' | 'visible';
      }
    | string;
  pad?: PadType;
  responsive?: boolean;
  round?: RoundType;
  skeleton?: SkeletonType;
  tag?: PolymorphicType;
  as?: PolymorphicType;
  width?: WidthType;
  wrap?: boolean | 'reverse';
}

export interface BoxExtendedProps
  extends BoxProps,
    Omit<JSX.IntrinsicElements['div'], keyof BoxProps> {}

// Keep type alias for backwards compatibility.
export type BoxTypes = BoxProps & JSX.IntrinsicElements['div'];

declare const Box: React.FC<BoxExtendedProps>;

export { Box };
