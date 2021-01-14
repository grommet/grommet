import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  BackgroundType,
  ColorType,
  FillType,
  GapType,
  GridAreaType,
  MarginType,
  Omit,
  PolymorphicType,
} from '../../utils';

import { TipProps } from '../Tip';

export interface ButtonProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  active?: boolean;
  color?: ColorType;
  disabled?: boolean;
  fill?: FillType;
  focusIndicator?: boolean;
  gap?: GapType;
  hoverIndicator?: BackgroundType | boolean;
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top' | string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  secondary?: boolean;
  size?: 'small' | 'medium' | 'large';
  tip?: TipProps | string;
  type?: 'button' | 'reset' | 'submit';
  as?: PolymorphicType;
}

declare const Button: React.FC<ButtonProps &
  Omit<JSX.IntrinsicElements['button'], 'color'>>;
export type ButtonType = ButtonProps &
  Omit<JSX.IntrinsicElements['button'], 'color'>;

export { Button };
