import * as React from "react";

export interface ResponsiveProps {
  onChange?: (...args: any[]) => any;
}

declare const Responsive: React.ComponentType<ResponsiveProps>;

export { Responsive };
