// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { DropType } from '../Drop';

type A11yTitleType = string;
type TextAlignType = 'start' | 'center' | 'end' | 'justify';
type WidthShirtSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | string;
type WidthType =
  | 'xxsmall'
  | 'xxlarge'
  | WidthShirtSize
  | '100%'
  | {
      width?: 'xxsmall' | 'xxlarge' | WidthShirtSize | '100%';
      max?: 'xxsmall' | 'xxlarge' | WidthShirtSize | '100%';
      min?: 'xxsmall' | 'xxlarge' | WidthShirtSize | '100%';
    };

export interface TextInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onSelect' | 'size' | 'placeholder' | 'width'
  > {
  a11yTitle?: A11yTitleType;
  dropAlign?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropTarget?: object;
  dropProps?: DropType;
  focusIndicator?: boolean;
  defaultSuggestion?: number;
  icon?: React.ReactNode;
  id?: string;
  messages?: {
    enterSelect?: string;
    hidePassword?: string;
    showPassword?: string;
    suggestionsCount?: string;
    suggestionsExist?: string;
    suggestionIsOpen?: string;
  };
  name?: string;
  onSelect?: (x: {
    target: React.RefObject<HTMLElement | null>['current'];
    suggestion: any;
  }) => void;
  onSuggestionSelect?: (x: {
    target: React.RefObject<HTMLElement | null>['current'];
    suggestion: any;
  }) => void;
  onSuggestionsOpen?: () => void;
  onSuggestionsClose?: () => void;
  placeholder?: string | React.ReactNode;
  plain?: boolean | 'full';
  showPasswordToggle?: boolean;
  readOnlyCopy?: boolean;
  reverse?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  suggestions?: ({ label?: React.ReactNode; value?: any } | string)[];
  textAlign?: TextAlignType;
  value?: string | number;
  width?: WidthType;
}

declare const TextInput: React.FC<TextInputProps>;

export { TextInput };
