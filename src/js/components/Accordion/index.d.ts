import * as React from "react";

export interface AccordionProps {
  activeIndex?: number | number[];
  animate?: boolean;
  children: any[];
  onActive?: (...args: any[]) => any;
  multiple?: boolean;
  messages?: {tabContents: string};
}

declare const Accordion: React.ComponentType<AccordionProps>;

export { Accordion };
