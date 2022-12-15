import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';

type RadioButtonGroup = Omit<RadioButtonGroupProps, 'options'>;
declare const ThumbsRating: React.FC<RadioButtonGroup>;

export { ThumbsRating };
