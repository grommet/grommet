import * as React from "react";

export interface GrommetProps {
  full?: boolean;
  plain?: boolean;
  theme?: object;
  userAgent?: string;
}

declare const Grommet: React.ComponentType<GrommetProps & JSX.IntrinsicElements['div']>;

export { Grommet };
