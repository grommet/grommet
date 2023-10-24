import * as React from 'react';
import { BasicSelectProps } from '../Select';

export interface SelectMultipleProps extends BasicSelectProps {
  defaultValue?: (string | number | object)[];
  help?: string | React.ReactNode;
  limit?: number;
  value?: (string | number | object)[];
  showSelectedInline?: boolean;
  sortSelectedOnClose?: boolean;
}

// Try without Omit<> to see where we define our own attributes for overrides
// value, name, id, onChange, placeholder
export interface SelectMultipleExtendedProps
  extends SelectMultipleProps,
    Omit<JSX.IntrinsicElements['input'], keyof SelectMultipleProps> {}

declare const SelectMultiple: React.FC<SelectMultipleExtendedProps>;

export { SelectMultiple };
