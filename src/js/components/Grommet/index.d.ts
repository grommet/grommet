import * as React from "react";

export interface GrommetProps {
  full?: boolean;
  theme?: object;
}

declare const Grommet: React.StatelessComponent<GrommetProps>;

export { Grommet };
