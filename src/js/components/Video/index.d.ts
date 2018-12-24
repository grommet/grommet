import * as React from 'react';
import { GrommetAlignSelfOrJustify, GrommetMargin } from '../../types/common';

export interface VideoProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  autoPlay?: boolean;
  controls?: 'false' | 'over' | 'below';
  fit?: 'cover' | 'contain';
  loop?: boolean;
  mute?: boolean;
}

declare const Video: React.ComponentType<VideoProps>;

export { Video };
