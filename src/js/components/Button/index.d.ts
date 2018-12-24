import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
} from '../../types/common';

export interface ButtonProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  active?: boolean;
  color?: string | {dark?: string,light?: string};
  disabled?: boolean;
  fill?: boolean;
  focusIndicator?: boolean;
  hoverIndicator?: boolean | 'background' | {background?: boolean | string};
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: AnyFunction;
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  type?: 'button' | 'reset' | 'submit';
  as?: string;
}

declare const Button: React.ComponentType<ButtonProps & JSX.IntrinsicElements['button']>;

export { Button };
