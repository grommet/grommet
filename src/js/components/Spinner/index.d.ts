import * as React from 'react';

import { ColorType } from 'grommet/utils';
import { BoxProps } from '../Box';
export interface SpinnerProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  color?: ColorType;
  message?: string | { start?: string; end?: string };
}

declare const Spinner: React.FC<BoxProps & SpinnerProps>;

export { Spinner };
