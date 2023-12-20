import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';

type RadioButtonGroup = Omit<RadioButtonGroupProps, 'options'> & {
  id?: string;
};
declare const StarRating: React.FC<RadioButtonGroup>;

export { StarRating };
