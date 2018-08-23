import * as React from "react";

export interface SelectProps {
  a11yTitle: string;
  children: (...args: any[]) => any;
  closeOnChange: boolean;
  disabled: boolean;
  dropAlign: {top: "top" | "bottom",bottom: "top" | "bottom",right: "left" | "right",left: "left" | "right"};
  dropTarget: object;
  focusIndicator: boolean;
  messages: {multiple: string};
  multiple: boolean;
  onChange: (...args: any[]) => any;
  onClose: (...args: any[]) => any;
  onSearch: (...args: any[]) => any;
  options?: string | JSX.Element | object[];
  placeholder: string | React.ReactNode;
  plain: boolean;
  searchPlaceholder: string;
  selected: number | number[];
  size: "small" | "medium" | "large" | "xlarge";
  value: string | JSX.Element | object | string | object[];
}

declare const Select: React.ComponentType<SelectProps>;

export { Select };
