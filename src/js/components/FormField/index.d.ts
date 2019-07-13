import * as React from "react";
import { SelectProps } from '../Select/';
export interface FormFieldProps {
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  label?: string | React.ReactNode;
  name?: string;
  pad?: boolean;
  required?: boolean;
  component?: any;
  validate?: {regexp?: object,message?: string} | ((...args: any[]) => any);
}

declare const FormField: React.ComponentClass<FormFieldProps & JSX.IntrinsicElements['input'] & SelectProps>;

export { FormField };
