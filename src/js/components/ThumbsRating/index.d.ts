import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';
export interface ThumbsRating {
  color?: string | object;
  options?: (
    | string
    | number
    | boolean
    | {
        disabled?: boolean;
        id?: string;
        label?: string | React.ReactNode;
        value: string | number | boolean;
      }
  )[];
}

type RadioButtonGroup = Omit<RadioButtonGroupProps, 'options'>;
export interface ThumbsRatingProps extends ThumbsRating, RadioButtonGroup {}

declare const ThumbsRating: React.FC<ThumbsRatingProps>;

export { ThumbsRating };
