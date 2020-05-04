import * as React from "react";

export interface FormProps<T> {
  errors?: {};
  infos?: {};
  messages?: {invalid?: string,required?: string};
  onChange?: (value: T) => void;
  onSubmit?: ((event: React.FormEvent) => void);
  onReset?: ((event: React.SyntheticEvent) => any);
  validate?: 'blur' | 'submit';
  value?: {};
}

export type TypedForm<T = any> = React.ComponentClass<FormProps<T> & Omit<JSX.IntrinsicElements['form'], 'onChange'>>
declare const Form: TypedForm;

export { Form };
