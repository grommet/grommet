import * as React from "react";

export interface TextInputProps {
  dropAlign?: {top: "top" | "bottom",bottom: "top" | "bottom",right: "left" | "right",left: "left" | "right"};
  dropTarget?: object;
  id?: string;
  focusIndicator?: boolean;
  messages?: {enterSelect: string,suggestionsCount: string,suggestionsExist: string,suggestionIsOpen: string};
  name?: string;
  onInput?: (...args: any[]) => any;
  onSelect?: (...args: any[]) => any;
  placeholder?: string | React.ReactNode;
  plain?: boolean;
  size?: "small" | "medium" | "large" | "xlarge";
  suggestions?: {label: React.ReactNode,value: any} | string[];
  value?: string;
}

declare const TextInput: React.ComponentType<TextInputProps>;

export { TextInput };
