import * as React from "react";

export interface AccordionProps {
  activeIndex?: number | number[];
  animate?: boolean;
  children: React.ReactNode;
  onActive?: (...args: any[]) => any;
  multiple?: boolean;
  messages?: {tabContents: string};
}

declare const Accordion: React.StatelessComponent<AccordionProps>;

export { Accordion };
