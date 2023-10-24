import * as React from 'react';
import { A11yTitleType } from '../../utils';

export interface TextAreaProps {
  a11yTitle?: A11yTitleType;
  fill?: boolean;
  focusIndicator?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  plain?: boolean;
  resize?: 'vertical' | 'horizontal' | boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  value?: string;
}

type textareaProps = Omit<JSX.IntrinsicElements['textarea'], 'value'>;

export interface TextAreaExtendedProps extends TextAreaProps, textareaProps {}

declare const TextArea: React.FC<TextAreaExtendedProps>;

export { TextArea };
