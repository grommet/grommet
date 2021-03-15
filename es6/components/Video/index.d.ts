import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  Omit,
} from '../../utils';

export interface VideoProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  autoPlay?: boolean;
  controls?: false | 'over' | 'below';
  fit?: 'cover' | 'contain';
  gridArea?: GridAreaType;
  loop?: boolean;
  margin?: MarginType;
  messages?: {
    closeMenu?: string;
    fullScreen?: string;
    progressMeter?: string;
    openMenu?: string;
    scrubber?: string;
    pauseButton?: string;
    playButton?: string;
    volumeUp?: string;
    volueDown?: string;
  };

  mute?: boolean;
}

export interface VideoExtendedProps
  extends VideoProps,
    Omit<JSX.IntrinsicElements['video'], 'controls'> {}

declare const Video: React.FC<VideoExtendedProps>;

export { Video };
