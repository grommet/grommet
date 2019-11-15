import * as React from "react";
import { A11yTitleType, AlignSelfType, AnimateType, GridAreaType, MarginType } from "../../utils";

export interface AccordionProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  activeIndex?: number | number[];
  animate?: AnimateType;
  onActive?: ((activeIndexes: number[]) => void);
  multiple?: boolean;
  messages?: {tabContents?: string};
}

declare const Accordion: React.FC<AccordionProps & JSX.IntrinsicElements['div']>;

export { Accordion };
