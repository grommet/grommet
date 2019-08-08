import * as React from "react";
import { A11yTitleType, AlignSelfType, MarginType } from "../../utils";

export interface AccordionProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  activeIndex?: number | number[];
  animate?: boolean;
  children?: React.ReactNode;
  onActive?: ((...args: any[]) => any);
  multiple?: boolean;
  messages?: {tabContents?: string};
}

declare const Accordion: React.ComponentClass<AccordionProps & JSX.IntrinsicElements['div']>;

export { Accordion };
