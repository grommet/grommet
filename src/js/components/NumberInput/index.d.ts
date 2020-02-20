import * as React from "react";
import { Omit, PlaceHolderType, } from "../../utils";
import { DropProps } from "../Drop";

export interface NumberInputProps {
  focusIndicator?: boolean;
  id?: string;
  name?: string;
  onSelect?: ((x: { target: React.RefObject<HTMLElement>['current'], suggestion: any }) => void);
  onSuggestionsOpen?: ((...args: any[]) => any);
  onSuggestionsClose?: ((...args: any[]) => any);
  placeholder?: PlaceHolderType;
  plain?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: number;
}

declare const NumberInput: React.ComponentClass<NumberInputProps & Omit<JSX.IntrinsicElements['input'], 'size' | 'placeholder'>>;

export { NumberInput };
