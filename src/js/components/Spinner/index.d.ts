import * as React from 'react';

import {BoxProps} from '../Box';
export interface SpinnerProps {
  size?: string;
}

declare const Spinner: React.FC<BoxProps & SpinnerProps>;

export { Spinner };
