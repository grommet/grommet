import * as React from 'react';
import { Omit, PlaceHolderType, MarginType } from '../../utils';
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
  // Although Placeholder is not a prop within FormField we Omit the HTML placeholder attribute and replaced with following.
  placeholder?: PlaceHolderType;
  required?: boolean | { indicator: boolean };
  component?: any;
  validate?:
    | {
        regexp?: object;
        message?: string | React.ReactNode;
        status?: 'error' | 'info';
      }
    | ((...args: any[]) => any)
    | (
        | {
            regexp?: object;
            message?: string | React.ReactNode;
            status?: 'error' | 'info';
          }
        | ((...args: any[]) => any)
      )[];
  validateOn?: 'blur' | 'submit' | 'change';
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
