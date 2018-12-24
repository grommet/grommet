import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface TextAreaProps {
  id?: string;
  fill?: boolean;
  focusIndicator?: boolean;
  name?: string;
  onChange?: AnyFunction;
  placeholder?: string;
  plain?: boolean;
  value?: string;
}

declare const TextArea: React.ComponentType<TextAreaProps & JSX.IntrinsicElements['textarea']>;

export { TextArea };
