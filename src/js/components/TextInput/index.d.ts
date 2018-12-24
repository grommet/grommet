import * as React from 'react';
import { AnyFunction, GrommetSizeSToXL } from '../../types/common';

export interface TextInputProps {
  dropAlign?: {top?: 'top' | 'bottom', bottom?: 'top' | 'bottom', right?: 'left' | 'right', left?: 'left' | 'right'};
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropTarget?: object;
  id?: string;
  focusIndicator?: boolean;
  messages?: {enterSelect?: string, suggestionsCount?: string, suggestionsExist?: string, suggestionIsOpen?: string};
  name?: string;
  onChange?: AnyFunction;
  onSelect?: AnyFunction;
  onSuggestionsOpen?: AnyFunction;
  onSuggestionsClose?: AnyFunction;
  placeholder?: string | React.ReactNode;
  plain?: boolean;
  size?: GrommetSizeSToXL | string;
  suggestions?: {label?: React.ReactNode, value?: any} | string[];
  value?: string;
}

declare const TextInput: React.ComponentType<TextInputProps & JSX.IntrinsicElements['input']>;

export { TextInput };
