import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  FillType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface StackProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  anchor?:
    | 'center'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'bottom-left'
    | 'top-right'
    | 'bottom-right';
  fill?: FillType;
  gridArea?: GridAreaType;
  guidingChild?: number | 'first' | 'last';
  interactiveChild?: number | 'first' | 'last';
  margin?: MarginType;
}

declare const Stack: React.FC<StackProps & JSX.IntrinsicElements['div']>;

export { Stack };
