import * as React from 'react';

export interface SelectorProps {
  children?: React.ReactNode;
  // this feels a little opinionated to have
  counter?: number;
  description?: string;
  icon?: JSX.Element;
  selected?: boolean;
  title?: string;
}

declare const Selector: React.FC<SelectorProps>;

export { Selector };
