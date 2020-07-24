import * as React from 'react';
import { Omit, PlaceHolderType, MarginType } from '../../utils';
import { BoxProps } from '../Box';

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
  required?: boolean;
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
}

declare const FormField: React.ComponentClass<FormFieldProps &
  Omit<JSX.IntrinsicElements['input'], 'placeholder'>>;

export { FormField };
