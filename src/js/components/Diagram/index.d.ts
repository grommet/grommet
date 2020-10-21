import * as React from 'react';

import { ColorType } from '../../utils';

export type DiagramConnectionAnchor = 'center' | 'vertical' | 'horizontal';
export type DiagramConnectionType = 'direct' | 'curved' | 'rectilinear';

export interface DiagramProps {
  connections: {
    anchor?: DiagramConnectionAnchor;
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

declare const Diagram: React.FC<DiagramProps & JSX.IntrinsicElements['svg']>;

export { Diagram };
