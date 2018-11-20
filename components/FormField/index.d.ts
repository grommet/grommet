import * as React from "react";

export interface FormFieldProps {
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  label?: string | React.ReactNode;
}

declare const FormField: React.ComponentType<FormFieldProps>;

export { FormField };
