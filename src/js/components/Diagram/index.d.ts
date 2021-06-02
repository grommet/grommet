import * as React from 'react';

import { ColorType } from '../../utils';

export type DiagramConnectionAnchor = 'center' | 'vertical' | 'horizontal';
export type DiagramConnectionType = 'direct' | 'curved' | 'rectilinear';
export type DiagramAnimationType =
  | boolean
  | 'pulse'
  | 'draw'
  | {
      type?: 'pulse' | 'draw';
      // looking into it, but delay seems to only work when delay <= 1000
      delay?: number;
      duration?: number;
      // currently, the only animation Diagram has that utilizes size is for "pulse"
      size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    };

export interface DiagramProps {
  animation?: DiagramAnimationType;
  connections: {
    anchor?: DiagramConnectionAnchor;
    animation?: DiagramAnimationType;
    color?: ColorType;
    fromTarget: string | object;
    label?: string;
    offset?: 'xsmall' | 'small' | 'medium' | 'large' | string;
    thickness?:
      | 'hair'
      | 'xxsmall'
      | 'xsmall'
      | 'small'
      | 'medium'
      | 'large'
      | string;
    toTarget: string | object;
    type?: DiagramConnectionType;
  }[];
}

type divProps = JSX.IntrinsicElements['svg'];

export interface DiagramExtendedProps extends DiagramProps, divProps {}

declare const Diagram: React.FC<DiagramExtendedProps>;

export { Diagram };
