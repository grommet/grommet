import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeXSToXL,
} from '../../types/common';

export interface AnchorProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  color?: string | {dark?: string, light?: string};
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: AnyFunction;
  reverse?: boolean;
  size?: GrommetSizeXSToXL | 'xxlarge' | string;
  as?: string;
}

declare const Anchor: React.ComponentType<AnchorProps & JSX.IntrinsicElements['a']>;

export { Anchor };
