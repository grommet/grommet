// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { DropType } from '../Drop';
import { A11yTitleType, TextAlignType, WidthType } from '../../utils';

export interface TextInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onSelect' | 'size' | 'placeholder' | 'width'
  > {
  a11yTitle?: A11yTitleType;
  copy?: boolean;
  defaultSuggestion?: number;
  dropAlign?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropProps?: DropType;
  dropTarget?: object;
  focusIndicator?: boolean;
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
  /**
   * Called when the copy button is activated. The value is unmasked; do not
   * log, persist, or transmit it unless explicitly required.
   */
  onClickCopy?: (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string,
  ) => void | Promise<void>;
  onSelect?: (x: {
    target: React.RefObject<HTMLElement | null>['current'];
    suggestion: any;
  }) => void;
  onSuggestionSelect?: (x: {
    target: React.RefObject<HTMLElement | null>['current'];
    suggestion: any;
  }) => void;
  onSuggestionsClose?: () => void;
  onSuggestionsOpen?: () => void;
  password?: boolean;
  placeholder?: string | React.ReactNode;
  plain?: boolean | 'full';
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
