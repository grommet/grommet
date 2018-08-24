import * as React from "react";

export interface GrommetProps {
  full?: boolean;
  theme?: object;
}

declare const Grommet: React.ComponentType<GrommetProps>;

export { Grommet };
