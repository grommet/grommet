import * as React from "react";

export interface FormFieldProps {
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  label?: string | React.ReactNode;
  name?: string;
  pad?: boolean;
  required?: boolean;
  validate?: object | ((...args: any[]) => any);
}

declare const FormField: React.ComponentType<FormFieldProps>;

export { FormField };
