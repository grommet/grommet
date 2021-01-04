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

declare const TextArea: React.FC<TextAreaProps &
  JSX.IntrinsicElements['textarea']>;

export { TextArea };
