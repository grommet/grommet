import * as React from 'react';
import { FormFieldProps } from '../FormField/index';

export interface FeedbackPosNegProps {
  formFieldProps?: FormFieldProps;
  color?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const FeedbackPosNeg: React.FC<FeedbackPosNegProps>;

export { FeedbackPosNeg };
