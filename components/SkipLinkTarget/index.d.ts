import * as React from 'react';

export interface SkipLinkTargetProps {
  id: string;
  label?: React.ReactNode;
}

declare const SkipLinkTarget: React.ComponentType<SkipLinkTargetProps>;

export { SkipLinkTarget };
