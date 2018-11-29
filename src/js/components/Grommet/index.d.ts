import * as React from "react";

export interface GrommetProps {
  full?: boolean;
  plain?: boolean;
  theme?: object;
  ssrHeaders?: object;
}

declare const Grommet: React.ComponentType<GrommetProps>;

export { Grommet };
