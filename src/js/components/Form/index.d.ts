import * as React from 'react';

export interface FormExtendedEvent<R = Record<string, unknown>, T = Element>
  extends React.FormEvent<T> {
  value: R;
  touched: Record<string, boolean>;
}

export interface FormProps<T> {
  errors?: {};
  infos?: {};
  messages?: { invalid?: string; required?: string };
  onChange?: (value: T) => void;
  onSubmit?: (event: FormExtendedEvent<T>) => void;
  onReset?: (event: React.SyntheticEvent) => any;
  onValidate?: (validationResults: {
    errors: Record<string, any>;
    infos: Record<string, any>;
  }) => void;
  validate?: 'blur' | 'submit';
  value?: {};
}

export type TypedForm<T = unknown> = React.ComponentClass<
  FormProps<T> & Omit<JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'>
>;
declare const Form: TypedForm;

export { Form };
