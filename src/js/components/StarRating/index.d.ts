import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';
export interface StarRatingProps {
  color?: string | object;
  scale?: number;
}

export interface StarRatingExtendedProps
  extends StarRatingProps,
    RadioButtonGroupProps {}

declare const StarRating: React.FC<StarRatingExtendedProps>;

export { StarRating };
