import * as React from 'react';
import { BasicSelectProps } from '../Select';

export interface MultiSelectProps extends BasicSelectProps {
  defaultValue?: (string | number | object)[];
  helpContent?: React.ReactNode;
  value?: (string | number | object)[];
  showSelectedInline?: boolean;
}

// Try without Omit<> to see where we define our own attributes for overrides
// value, name, id, onChange, placeholder
export interface MultiSelectExtendedProps
  extends MultiSelectProps,
    Omit<JSX.IntrinsicElements['input'], keyof MultiSelectProps> {}

declare const MultiSelect: React.FC<MultiSelectExtendedProps>;

export { MultiSelect };
