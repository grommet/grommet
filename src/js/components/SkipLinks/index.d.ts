import * as React from "react";

export interface SkipLinksProps {
  children: React.ReactNode;
  messages?: {skipTo?: string};
}

declare const SkipLinks: React.ComponentType<SkipLinksProps & JSX.IntrinsicElements['div']>;

export { SkipLinks };
