import * as React from 'react';
import { FormFieldProps } from '../FormField/index';

export interface ThumbRatingProps {
  formFieldProps?: FormFieldProps;
  color?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const ThumbsRating: React.FC<ThumbRatingProps>;

export { ThumbsRating };
