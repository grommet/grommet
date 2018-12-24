import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeXSToXL,
} from '../../types/common';

export interface DistributionProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  children?: AnyFunction;
  fill?: boolean;
  gap?: GrommetSizeXSToXL | string;
  values: {value: number}[];
}

declare const Distribution: React.ComponentType<DistributionProps>;

export { Distribution };
