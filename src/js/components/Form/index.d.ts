import * as React from "react";

export interface FormProps {
  errors?: {};
  messages?: {invalid?: string,required?: string};
  onChange?: ((event: React.ChangeEvent) => void);
  onSubmit?: ((event: React.FormEvent) => void);
  onReset?: ((event: React.SyntheticEvent) => any);
  value?: {};
}

declare const Form: React.ComponentClass<FormProps & JSX.IntrinsicElements['form']>;

export { Form };
