import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface ToolbarProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface ToolbarExtendedProps
  extends BoxProps,
  ToolbarProps,
    divProps {}

declare const Toolbar: React.FC<ToolbarExtendedProps>;

export { Toolbar };
