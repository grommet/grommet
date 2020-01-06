import * as React from "react";
import { ThemeType } from "../../themes";
import { BackgroundType } from '../../utils';

export interface MnetUIBaseProps {
  background?: BackgroundType;
  cssVars?: boolean;
  dir?: "rtl";
  full?: boolean;
  plain?: boolean;
  theme?: ThemeType;
  themeMode?: "dark" | "light";
  userAgent?: string;
}

declare const MnetUIBase: React.ComponentClass<MnetUIBaseProps & JSX.IntrinsicElements['div']>;

export { MnetUIBase };
