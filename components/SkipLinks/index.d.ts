import * as React from 'react';

export interface SkipLinksProps {
  id?: string;
  children: React.ReactNode;
  messages?: { skipTo?: string };
}

declare const SkipLinks: React.FC<SkipLinksProps>;

export { SkipLinks };
