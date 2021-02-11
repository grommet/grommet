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

export interface TextProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: PolymorphicType;
  color?: ColorType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  size?:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | string;
  tag?: PolymorphicType;
  textAlign?: TextAlignType;
  truncate?: boolean;
  weight?: 'normal' | 'bold' | number;
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
}

declare const Text: React.FC<TextProps &
  Omit<JSX.IntrinsicElements['span'], 'color'>>;

export { Text };
