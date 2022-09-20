import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface ButtonBarProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface ButtonBarExtendedProps
  extends BoxProps,
  ButtonBarProps,
    divProps {}

declare const ButtonBar: React.FC<ButtonBarExtendedProps>;

export { ButtonBar };
