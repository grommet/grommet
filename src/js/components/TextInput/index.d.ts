import * as React from "react";
import { Omit, PlaceHolderType, } from "../../utils";
import { DropProps } from "../Drop";

export interface TextInputProps {
  dropAlign?: {top?: "top" | "bottom",bottom?: "top" | "bottom",right?: "left" | "right",left?: "left" | "right"};
  dropHeight?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  dropTarget?: object;
  dropProps?: DropProps;
  id?: string;
  focusIndicator?: boolean;
  messages?: {enterSelect?: string,suggestionsCount?: string,suggestionsExist?: string,suggestionIsOpen?: string};
  name?: string;
  onSelect?: ((x: { target: React.RefObject<HTMLElement>['current'], suggestion: any }) => void);
  onSuggestionsOpen?: ((...args: any[]) => any);
  onSuggestionsClose?: ((...args: any[]) => any);
  placeholder?: PlaceHolderType;
  plain?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  suggestions?: ({label?: React.ReactNode,value?: any} | string)[];
  value?: string | number;
}

declare const TextInput: React.ComponentClass<TextInputProps & Omit<JSX.IntrinsicElements['input'], 'onSelect' | 'size' | 'placeholder'>>;

export { TextInput };
