import * as React from "react";
import { Omit } from "../../utils";

export interface FormFieldProps {
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  label?: string | React.ReactNode;
  name?: string;
  pad?: boolean;
  placeholder?: React.ReactNode;
  required?: boolean;
  component?: any;
  validate?: {regexp?: object,message?: string} | ((...args: any[]) => any);
}

declare const FormField: React.ComponentClass<FormFieldProps & Omit<JSX.IntrinsicElements['input'], 'placeholder'>>;

export { FormField };
