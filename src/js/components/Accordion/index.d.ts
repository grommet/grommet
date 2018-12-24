import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
} from '../../types/common';

export interface AccordionProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  activeIndex?: number | number[];
  animate?: boolean;
  children?: React.ReactNode;
  onActive?: AnyFunction;
  multiple?: boolean;
  messages?: {tabContents?: string};
}

declare const Accordion: React.ComponentType<AccordionProps>;

export { Accordion };
