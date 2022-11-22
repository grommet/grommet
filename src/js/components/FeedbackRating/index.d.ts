import * as React from 'react';
import { FormFieldProps } from '../FormField/index';

export interface FeedbackRating {
  formFieldProps?: FormFieldProps;
  color?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const FeedbackRating: React.FC<FeedbackRating>;

export { FeedbackRating };
