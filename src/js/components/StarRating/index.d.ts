import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';
export interface StarRating {
  color?: string | object;
  scale?: number;
}

export interface StarRatingProps extends StarRating, RadioButtonGroupProps {}

declare const StarRating: React.FC<StarRatingProps>;

export { StarRating };
