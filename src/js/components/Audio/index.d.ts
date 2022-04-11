import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface AudioProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  autoPlay?: boolean;
  gridArea?: GridAreaType;
  margin?: MarginType;
  messages?: {
    progressMeter?: string;
    scrubber?: string;
    pauseButton?: string;
    playButton?: string;
    volume?: string;
  };
}

type audioType = JSX.IntrinsicElements['audio'];

export interface AudioExtendedProps
  extends AudioProps, audioType {}

declare const Audio: React.FC<AudioExtendedProps>;

export { Audio };
