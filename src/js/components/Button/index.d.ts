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
  badge?:
    | boolean
    | number
    | {
        background?: BackgroundType;
        max?: number;
        value?: boolean | number;
      }
    | JSX.Element;
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
  kind?: string;
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

export interface ButtonExtendedProps
  extends ButtonProps,
    Omit<JSX.IntrinsicElements['button'], 'color'> {}

// Keep type alias for backwards compatibility.
export type ButtonType = ButtonProps &
  Omit<JSX.IntrinsicElements['button'], 'color'>;

declare const Button: React.FC<ButtonExtendedProps>;

export { Button };
