import * as React from 'react';

export interface CollapsibleProps {
  open?: boolean;
  direction?: 'horizontal' | 'vertical';
  unmount?: boolean;
}

type divProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface CollapsibleExtendedProps extends CollapsibleProps, divProps {}

declare const Collapsible: React.FC<CollapsibleExtendedProps>;

export { Collapsible };
