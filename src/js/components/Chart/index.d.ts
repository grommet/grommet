import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  ColorType,
  EdgeSizeType,
  GapType,
  GridAreaType,
  MarginType,
  ThicknessType,
} from '../../utils';

export interface ChartProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  animate?: boolean;
  gridArea?: GridAreaType;
  margin?: MarginType;
  bounds?: number[][];
  color?:
    | ColorType
    | { color: ColorType; value: number | number[] }[]
    // deprecated
    | {
        color?: ColorType;
        opacity?: 'weak' | 'medium' | 'strong' | boolean | number;
      };
  dash?: boolean;
  gap?: GapType;
  onClick?: (...args: any[]) => any;
  onHover?: (...args: any[]) => any;
  opacity?: 'weak' | 'medium' | 'strong' | boolean | number;
  overflow?: boolean;
  pad?: EdgeSizeType | { horizontal?: EdgeSizeType; vertical?: EdgeSizeType };
  point?:
    | 'circle'
    | 'diamond'
    | 'square'
    | 'star'
    | 'triangle'
    | 'triangleDown';
  round?: boolean;
  size?:
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'fill'
    | 'full'
    | {
        height?:
          | 'xxsmall'
          | 'xsmall'
          | 'small'
          | 'medium'
          | 'large'
          | 'xlarge'
          | 'fill'
          | 'full'
          | string;
        width?:
          | 'xxsmall'
          | 'xsmall'
          | 'small'
          | 'medium'
          | 'large'
          | 'xlarge'
          | 'fill'
          | 'full'
          | string;
      }
    | string;
  thickness?: ThicknessType;
  type?: 'bar' | 'line' | 'area' | 'point';
  values: (
    | number
    | number[]
    | {
        color?: ColorType;
        label?: string;
        onClick?: (...args: any[]) => any;
        onHover?: (...args: any[]) => any;
        opacity?: 'weak' | 'medium' | 'strong' | boolean | number;
        thickness?: ThicknessType;
        value: number | number[];
      }
  )[];
}

declare const Chart: React.ComponentClass<ChartProps>;

export { Chart };
