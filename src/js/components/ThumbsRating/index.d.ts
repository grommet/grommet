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

export interface ThumbsRatingProps
  extends ThumbsRating,
    RadioButtonGroupProps {}

declare const ThumbsRating: React.FC<ThumbsRatingProps>;

export { ThumbsRating };
