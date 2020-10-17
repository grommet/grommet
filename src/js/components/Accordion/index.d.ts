import * as React from 'react';
import { AnimateType } from '../../utils';
import { BoxProps } from '../Box';

export interface AccordionProps {
  activeIndex?: number | number[];
  animate?: AnimateType;
  onActive?: (activeIndexes: number[]) => void;
  multiple?: boolean;
  messages?: { tabContents?: string };
}

declare const Accordion: React.FC<BoxProps &
  AccordionProps &
  JSX.IntrinsicElements['div']>;

export { Accordion };
