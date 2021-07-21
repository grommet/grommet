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

import { TipProps } from '../Tip';

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
  truncate?: boolean | 'tip';
  weight?: 'normal' | 'bold' | number;
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  tip?: TipProps;
}
export interface TextExtendedProps
  extends TextProps,
    Omit<JSX.IntrinsicElements['span'], 'color'> {}

declare const Text: React.FC<TextExtendedProps>;

export { Text };
