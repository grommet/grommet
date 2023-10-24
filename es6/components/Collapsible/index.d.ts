import * as React from 'react';

export interface CollapsibleProps {
  open?: boolean;
  direction?: 'horizontal' | 'vertical';
}

type divProps = JSX.IntrinsicElements['div'];

export interface CollapsibleExtendedProps extends CollapsibleProps, divProps {}

declare const Collapsible: React.FC<CollapsibleExtendedProps>;

export { Collapsible };
