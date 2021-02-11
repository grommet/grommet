import * as React from 'react';
import {
  A11yTitleType,
  AlignContentType,
  AlignSelfType,
  BorderType,
  FillType,
  GapType,
  GridAreaType,
  JustifyContentType,
  MarginType,
  PadType,
  PolymorphicType,
} from '../../utils';

export interface GridProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  align?: 'start' | 'center' | 'end' | 'stretch';
  alignContent?: AlignContentType;
  areas?: { name?: string; start?: number[]; end?: number[] }[] | string[][];
  as?: PolymorphicType;
  border?: BorderType;
  columns?:
    | (
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
        | string[]
      )[]
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | {
        count?: 'fit' | 'fill' | number;
        size?:
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
      }
    | string;
  fill?: FillType;
  gap?: GapType | { row?: GapType; column?: GapType };
  gridArea?: GridAreaType;
  justify?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: JustifyContentType;
  margin?: MarginType;
  pad?: PadType;
  responsive?: boolean;
  rows?:
    | (
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
        | string[]
      )[]
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | string;
  tag?: PolymorphicType;
}

declare const Grid: React.FC<GridProps & JSX.IntrinsicElements['div']>;

export { Grid };
