import * as React from 'react';
import { Omit, PlaceHolderType, TextAlignType } from '../../utils';
import { DropProps } from '../Drop';

export interface TextInputProps {
  dropAlign?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropTarget?: object;
  dropProps?: DropProps;
  focusIndicator?: boolean;
  icon?: JSX.Element;
  id?: string;
  messages?: {
    enterSelect?: string;
    suggestionsCount?: string;
    suggestionsExist?: string;
    suggestionIsOpen?: string;
  };
  name?: string;
  onSelect?: (x: {
    target: React.RefObject<HTMLElement>['current'];
    suggestion: any;
  }) => void;
  onSuggestionsOpen?: () => void;
  onSuggestionsClose?: () => void;
  placeholder?: PlaceHolderType;
  plain?: boolean | 'full';
  reverse?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  suggestions?: ({ label?: React.ReactNode; value?: any } | string)[];
  textAlign?: TextAlignType;
  value?: string | number;
}

declare const TextInput: React.ComponentClass<TextInputProps &
  Omit<JSX.IntrinsicElements['input'], 'onSelect' | 'size' | 'placeholder'>>;

export { TextInput };
