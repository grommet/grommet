import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  ColorType,
  GridAreaType,
  MarginType,
  Omit,
  PolymorphicType,
  TextAlignType,
} from '../../utils';

export interface HeadingProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: PolymorphicType;
  color?: ColorType;
  gridArea?: GridAreaType;
  fill?: boolean;
  level?: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6;
  margin?: MarginType;
  responsive?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  textAlign?: TextAlignType;
  truncate?: boolean;
}

declare const Heading: React.FC<HeadingProps &
  (
    | Omit<JSX.IntrinsicElements['h1'], 'color'>
    | Omit<JSX.IntrinsicElements['h2'], 'color'>
    | Omit<JSX.IntrinsicElements['h3'], 'color'>
    | Omit<JSX.IntrinsicElements['h4'], 'color'>
    | Omit<JSX.IntrinsicElements['h5'], 'color'>
    | Omit<JSX.IntrinsicElements['h6'], 'color'>
  )>;

export { Heading };
