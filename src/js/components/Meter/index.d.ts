import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  OpacityType,
} from '../../utils';

export interface MeterProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  background?: string | { color?: string; opacity?: OpacityType };
  color?: string;
  direction?: 'horizontal' | 'vertical';
  gridArea?: GridAreaType;
  margin?: MarginType;
  max?: number;
  messages?: {
    bar?: {
      singular?: string;
      plural?: string;
    };
    circle?: {
      singular?: string;
      plural?: string;
    };
    pie?: {
      singular?: string;
      plural?: string;
    };
    semicircle?: {
      singular?: string;
      plural?: string;
    };
  };
  reverse?: boolean;
  round?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | string;
  thickness?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  type?: 'bar' | 'circle' | 'pie' | 'semicircle';
  value?: number;
  values?: {
    color?: string;
    highlight?: boolean;
    label?: string;
    onClick?: (event: React.MouseEvent) => void;
    onHover?: (over: boolean) => void;
    value: number;
  }[];
}

declare const Meter: React.ComponentClass<MeterProps>;

export { Meter };
