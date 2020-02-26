import * as React from "react";

export interface FormProps {
  errors?: {};
  infos?: {};
  messages?: {invalid?: string,required?: string};
  onChange?: ((event: React.ChangeEvent) => void);
  onSubmit?: ((event: React.FormEvent) => void);
  onReset?: ((event: React.SyntheticEvent) => any);
  validate?: 'blur' | 'submit';
  value?: {};
}

declare const Form: React.ComponentClass<FormProps & JSX.IntrinsicElements['form']>;

export { Form };
