import * as React from 'react';

export interface SelectorHeaderProps {
  children?: React.ReactNode;
  title?: string;
}

declare const SelectorHeader: React.FC<SelectorHeaderProps>;

export { SelectorHeader };
