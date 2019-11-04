import * as React from "react";
import { ThemeType } from "../../themes";

export interface GrommetProps {
  cssVars?: boolean;
  full?: boolean;
  plain?: boolean;
  theme?: ThemeType;
  themeMode?: "dark" | "light";
  userAgent?: string;
}

declare const Grommet: React.ComponentClass<GrommetProps & JSX.IntrinsicElements['div']>;

export { Grommet };
