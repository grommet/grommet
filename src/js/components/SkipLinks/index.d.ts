import * as React from "react";

export interface SkipLinksProps {
  children: React.ReactNode;
  messages?: {skipTo: string};
}

declare const SkipLinks: React.StatelessComponent<SkipLinksProps>;

export { SkipLinks };
