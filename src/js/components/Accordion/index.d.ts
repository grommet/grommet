import * as React from 'react';
import { AnimateType } from '../../utils';
import { BoxProps } from '../Box';

export interface AccordionProps extends BoxProps {
  activeIndex?: number | number[];
  animate?: AnimateType;
  onActive?: (activeIndexes: number[]) => void;
  multiple?: boolean;
  messages?: { tabContents?: string };
}

export interface AccordionExtendedProps
  extends AccordionProps,
    Omit<JSX.IntrinsicElements['div'], 'onClick'> {}

declare const Accordion: React.FC<AccordionExtendedProps>;

export { Accordion };
