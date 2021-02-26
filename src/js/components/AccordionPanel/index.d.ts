import * as React from 'react';

export interface AccordionPanelProps {
  label?: string | React.ReactNode;
  header?: React.ReactNode;
}

export type AccordionPanelExtendedProps = AccordionPanelProps &
  JSX.IntrinsicElements['div'];

declare const AccordionPanel: React.FC<AccordionPanelExtendedProps>;

export { AccordionPanel };
