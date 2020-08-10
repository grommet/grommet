import * as React from 'react';

export interface FormExtendedEvent<T = Element> extends React.FormEvent<T> {
  value: Record<string, any>;
  touched: Record<string, boolean>;
}

export interface FormExtendedValidateEvent<T = Element>
  extends React.FormEvent<T> {
  error: Record<string, any>;
  info: Record<string, any>;
}

export interface FormProps<T> {
  errors?: {};
  infos?: {};
  messages?: { invalid?: string; required?: string };
  onChange?: (value: T) => void;
  onSubmit?: (event: FormExtendedEvent) => void;
  onReset?: (event: React.SyntheticEvent) => any;
  onValidate?: (event: FormExtendedValidateEvent) => void;
  validate?: 'blur' | 'submit';
  value?: {};
}

export type TypedForm<T = any> = React.ComponentClass<
  FormProps<T> & Omit<JSX.IntrinsicElements['form'], 'onChange'>
>;
declare const Form: TypedForm;

export { Form };
