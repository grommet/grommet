import * as React from 'react';
import { RadioButtonGroupExtendedProps } from '../RadioButtonGroup/index';

type RadioButtonGroup = Omit<RadioButtonGroupExtendedProps, 'options'>;
declare const StarRating: React.FC<RadioButtonGroup>;

export { StarRating };
