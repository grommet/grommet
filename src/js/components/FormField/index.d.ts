import * as React from "react";
import { CheckBoxProps } from "../CheckBox";
import { RadioButtonGroupProps } from "../RadioButtonGroup";
import { SelectProps } from "../Select";

export interface FormFieldProps {
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  label?: string | React.ReactNode;
  name?: string;
  pad?: boolean;
  required?: boolean;
  component?: React.ComponentType<any> | React.ReactNode;
  validate?: {regexp?: object,message?: string} | ((...args: any[]) => any);
}

declare const FormField: React.ComponentClass<FormFieldProps & JSX.IntrinsicElements['input'] & CheckBoxProps & RadioButtonGroupProps & SelectProps>;

export { FormField };
