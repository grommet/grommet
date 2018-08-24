import * as React from "react";

export interface SkipLinksProps {
  children: any[];
  messages?: {skipTo: string};
}

declare const SkipLinks: React.ComponentType<SkipLinksProps>;

export { SkipLinks };
