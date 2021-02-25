import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  ColorType,
  GridAreaType,
  MarginType,
  Omit,
  TextAlignType,
} from '../../utils';

export interface ParagraphProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  color?: ColorType;
  fill?: boolean;
  gridArea?: GridAreaType;
  margin?: MarginType;
  responsive?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | string;
  textAlign?: TextAlignType;
}

export interface ParagraphExtendedProps
  extends ParagraphProps,
    Omit<JSX.IntrinsicElements['p'], 'color'> {}

declare const Paragraph: React.FC<ParagraphExtendedProps>;

export { Paragraph };
