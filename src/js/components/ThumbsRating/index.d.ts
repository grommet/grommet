import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';
export interface ThumbsRatingProps {
  color?: string | object;
}

export interface ThumbsRatingExtendedProps
  extends ThumbsRatingProps,
    RadioButtonGroupProps {}

declare const ThumbsRating: React.FC<ThumbsRatingExtendedProps>;

export { ThumbsRating };
