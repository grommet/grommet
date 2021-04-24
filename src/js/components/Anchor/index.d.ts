import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  ColorType,
  GridAreaType,
  MarginType,
  Omit,
  PolymorphicType,
} from '../../utils';

export interface AnchorProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: PolymorphicType;
  color?: ColorType;
  disabled?: boolean;
  gridArea?: GridAreaType;
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  margin?: MarginType;
  reverse?: boolean;
  size?:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | string;
  weight?: 'normal' | 'bold' | number;
}

type aProps = Omit<JSX.IntrinsicElements['a'], 'color'>;

export interface AnchorExtendedProps extends AnchorProps, aProps {}

declare const Anchor: React.FC<AnchorExtendedProps>;

export { Anchor };
