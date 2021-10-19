import * as React from 'react';

import { ColorType } from 'grommet/utils';
import { BoxProps } from '../Box/index';

export interface SpinnerProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  color?: ColorType;
  message?: string | { start?: string; end?: string };
}

export interface SpinnerExtendedProps extends BoxProps, SpinnerProps {}

declare const Spinner: React.FC<SpinnerExtendedProps>;

export { Spinner };
