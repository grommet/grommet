import * as React from 'react';
import { FormFieldProps } from '../FormField/index';

export interface ThumbRatingProps {
  formFieldProps?: FormFieldProps;
  color?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  outlineColor?: string;
  options: (
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

declare const ThumbsRating: React.FC<ThumbRatingProps>;

export { ThumbsRating };
