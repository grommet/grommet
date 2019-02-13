import * as React from "react";

export interface FormProps {
  errors?: {};
  messages?: {invalid?: string,required?: string};
  onChange?: ((...args: any[]) => any);
  onSubmit?: ((...args: any[]) => any);
  value?: {};
}

declare const Form: React.ComponentType<FormProps & JSX.IntrinsicElements['form']>;

export { Form };
