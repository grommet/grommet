import * as React from 'react';
import { ThemeType } from '../../themes';
import { BackgroundType } from '../../utils';

export interface GrommetProps {
  background?: BackgroundType;
  containerTarget?: HTMLElement;
  cssVars?: boolean;
  dir?: 'rtl';
  full?: boolean;
  plain?: boolean;
  theme?: ThemeType;
  themeMode?: 'dark' | 'light';
  userAgent?: string;
}

export interface GrommetExtendedProps
  extends GrommetProps,
    Omit<JSX.IntrinsicElements['div'], 'dir'> {}

declare const Grommet: React.FC<GrommetExtendedProps>;

export { Grommet };
