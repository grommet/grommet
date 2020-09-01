import * as React from 'react';
import { BoxProps } from '../Box';

export interface AvatarProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  src?: string;
}

declare const Avatar: React.FC<BoxProps &
  AvatarProps &
  JSX.IntrinsicElements['div']>;

export { Avatar };
