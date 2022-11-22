import * as React from 'react';
import { Omit, MarginType } from '../../utils';
import { BoxProps } from '../Box/index';

export interface FormFieldProps {
  contentProps?: BoxProps;
  disabled?: boolean;
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  info?: string | React.ReactNode;
  label?: string | React.ReactNode;
  margin?: MarginType;
  name?: string;
  options?: string[];
  pad?: boolean;
}

type inputProps = Omit<
  JSX.IntrinsicElements['input'],
  'placeholder' | 'required'
>;

export interface FormFieldExtendedProps extends FormFieldProps, inputProps {}

declare const FormField: <T = {}>(
  p: FormFieldExtendedProps & T,
) => React.ReactElement<FormFieldExtendedProps & T>;

export { FormField };
