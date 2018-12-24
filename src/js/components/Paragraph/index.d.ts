import * as React from 'react';
import {
  GrommetAlignSelfOrJustify, GrommetMargin,
  GrommetSizeSToXL,
} from '../../types/common';

export interface ParagraphProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  color?: string  | {dark?: string,light?: string};;
  responsive?: boolean;
  size?: GrommetSizeSToXL | 'xxlarge' | string;
  textAlign?: 'start' | 'center' | 'end';
}

declare const Paragraph: React.ComponentType<ParagraphProps & JSX.IntrinsicElements['p']>;

export { Paragraph };
