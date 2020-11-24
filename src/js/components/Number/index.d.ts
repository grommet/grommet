import * as React from 'react';
import { TextProps } from '../Text';

export interface NumberProps {
  value: number;
  units?:
    | string
    | {
        label: string;
        TextProps;
      };
}

declare const Number: React.FC<NumberProps & TextProps>;

export { Number };
