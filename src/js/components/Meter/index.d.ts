import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin, GrommetSizeXSToXL,
} from '../../types/common';

export interface MeterProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  background?: string | {color?: string,opacity?: "weak" | "medium" | "strong" | boolean};
  round?: boolean;
  size?: GrommetSizeXSToXL | 'full' | string;
  thickness?: GrommetSizeXSToXL | string;
  type?: 'bar' | 'circle';
  values?: {
    color?: string,
    highlight?: boolean,
    label?: string,
    onClick?: AnyFunction,
    onHover?: AnyFunction,
    value: number,
  }[];
}

declare const Meter: React.ComponentType<MeterProps>;

export { Meter };
