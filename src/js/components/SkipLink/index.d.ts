import * as React from 'react';

export interface SkipLinkProps {
  id: string;
  label?: React.ReactNode;
}

declare const SkipLink: React.ComponentType<SkipLinkProps>;

export { SkipLink };
