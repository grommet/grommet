import * as React from "react";
import { ThemeType } from "../../themes";
import { BackgroundType } from '../../utils';

export interface GrommetProps {
  background?: BackgroundType;
  cssVars?: boolean;
  dir?: "rtl";
  full?: boolean;
  plain?: boolean;
  theme?: ThemeType;
  themeMode?: "dark" | "light";
  userAgent?: string;
}

declare const Grommet: React.ComponentClass<GrommetProps & JSX.IntrinsicElements['div']>;

export { Grommet };
