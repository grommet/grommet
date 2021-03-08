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

export type TextAreaExtendedProps = TextAreaProps &
  JSX.IntrinsicElements['textarea'];

declare const TextArea: React.FC<TextAreaExtendedProps>;

export { TextArea };
