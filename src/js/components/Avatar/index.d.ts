import * as React from 'react';
import { BoxProps } from '../Box';

export interface AvatarProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  src?: string;
}

export interface AvatarExtendedProps
  extends BoxProps,
    AvatarProps,
    Omit<JSX.IntrinsicElements['div'], 'onClick'> {}

declare const Avatar: React.FC<AvatarExtendedProps>;

export { Avatar };
