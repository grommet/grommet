import * as React from 'react';
import {
  A11yTitleType,
  AlignType,
  AlignContentType,
  AlignSelfType,
  BorderType,
  FillType,
  GapType,
  GridAreaType,
  HeightType,
  JustifyContentType,
  MarginType,
  PadType,
  PolymorphicType,
  WidthType,
} from '../../utils';

export type GridSizeType =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'full'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | 'flex'
  | 'auto'
  | string
  | string[];

export interface GridProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  align?: AlignType;
  alignContent?: AlignContentType;
  areas?: { name?: string; start?: number[]; end?: number[] }[] | string[][];
  as?: PolymorphicType;
  border?: BorderType;
  columns?:
    | GridSizeType
    | GridSizeType[]
    | {
        count?: 'fit' | 'fill' | number;
        size?: GridSizeType;
      };
  fill?: FillType;
  gap?: GapType | { row?: GapType; column?: GapType };
  gridArea?: GridAreaType;
  height?: HeightType;
  justify?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: JustifyContentType;
  margin?: MarginType;
  pad?: PadType;
  responsive?: boolean;
  rows?: GridSizeType | GridSizeType[];
  tag?: PolymorphicType;
  width?: WidthType;
}

type divProps = JSX.IntrinsicElements['div'];

export interface GridExtendedProps extends GridProps, divProps {}

declare const Grid: React.FC<GridExtendedProps>;

export { Grid };
