import * as React from "react";

export interface AccordionPanelProps {
  label?: string | React.ReactNode;
  header?: React.ReactNode;
}

declare const AccordionPanel: React.ComponentClass<AccordionPanelProps & JSX.IntrinsicElements['div']>;

export { AccordionPanel };
