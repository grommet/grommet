import * as React from 'react';
import {
  GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeXSToXL,
} from '../../types/common';

export interface TextProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  color?: string | {dark?: string, light?: string};
  size?: GrommetSizeXSToXL | string;
  tag?: string;
  as?: string;
  textAlign?: 'start' | 'center' | 'end';
  truncate?: boolean;
  weight?: 'normal' | 'bold' | number;
}

declare const Text: React.ComponentType<TextProps & JSX.IntrinsicElements['span']>;

export { Text };
