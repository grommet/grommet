import * as React from "react";

export interface SelectProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  children?: (...args: any[]) => any;
  closeOnChange?: boolean;
  disabled?: boolean | number[] | (...args: any[]) => any;
  disabledKey?: string | (...args: any[]) => any;
  dropAlign?: {top: "top" | "bottom",bottom: "top" | "bottom",right: "left" | "right",left: "left" | "right"};
  dropTarget?: object;
  focusIndicator?: boolean;
  labelKey?: string | (...args: any[]) => any;
  messages?: {multiple: string};
  multiple?: boolean;
  onChange?: (...args: any[]) => any;
  onClose?: (...args: any[]) => any;
  onSearch?: (...args: any[]) => any;
  options: string | JSX.Element | object[];
  placeholder?: string | React.ReactNode;
  plain?: boolean;
  searchPlaceholder?: string;
  selected?: number | number[];
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string | JSX.Element | object | string | object[];
  valueLabel?: React.ReactNode;
  valueKey?: string | (...args: any[]) => any;
}

declare const Select: React.ComponentType<SelectProps>;

export { Select };
