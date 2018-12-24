import * as React from 'react';
import { GrommetAlignSelfOrJustify, GrommetMargin } from '../../types/common';

export interface ImageProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  fit?: 'cover' | 'contain';
}

declare const Image: React.ComponentType<ImageProps & JSX.IntrinsicElements['img']>;

export { Image };
