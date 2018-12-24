import * as React from 'react';
import {
  GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeSToXL,
} from '../../types/common';

export interface HeadingProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  color?: string | {dark?: string,light?: string};;
  level?: '1' | '2' | '3' | '4' | '5' | '6' | '1' | '2' | '3' | '4' | '5' | '6';
  responsive?: boolean;
  size?: GrommetSizeSToXL | string;
  textAlign?: 'start' | 'center' | 'end';
  truncate?: boolean;
}

declare const Heading: React.ComponentType<HeadingProps>;

export { Heading };
