import * as React from "react";

export interface AccordionPanelProps {
  label: string | React.ReactNode;
  header?: React.ReactNode;
}

declare const AccordionPanel: React.StatelessComponent<AccordionPanelProps>;

export { AccordionPanel };
