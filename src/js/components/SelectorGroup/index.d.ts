import * as React from 'react';

export interface SelectorGroupProps {
  children?: React.ReactNode;
  multiple?: boolean;
  value?: string | string[]; // or selected?
  defaultValue?: string | string[];
  onSelect?: (event: React.MouseEvent & { value?: string | string[] }) => void;
}

declare const SelectorGroup: React.FC<SelectorGroupProps>;

export { SelectorGroup };
