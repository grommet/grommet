import * as React from "react";

export interface CollapsibleProps {
  open?: boolean;
  direction?: "horizontal" | "vertical";
}

declare const Collapsible: React.ComponentType<CollapsibleProps>;

export { Collapsible };
