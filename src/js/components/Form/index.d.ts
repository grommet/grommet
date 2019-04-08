import * as React from "react";

export interface FormProps {
  errors?: {};
  messages?: {invalid?: string,required?: string};
  onChange?: ((...args: any[]) => any);
  onSubmit?: ((...args: any[]) => any);
  onReset?: ((event: React.SyntheticEvent) => any);
  value?: {};
}

declare const Form: React.ComponentClass<FormProps & JSX.IntrinsicElements['form']>;

export { Form };
