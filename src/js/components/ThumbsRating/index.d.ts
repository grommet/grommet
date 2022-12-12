import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';
import { Omit } from 'grommet/utils';
export interface ThumbsRatingProps {
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
export interface ThumbsRatingExtendedProps extends ThumbsRatingProps, RadioButtonGroup {}

declare const ThumbsRating: React.FC<ThumbsRatingExtendedProps>;

export { ThumbsRating };
