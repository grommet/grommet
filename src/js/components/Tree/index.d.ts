import * as React from 'react';

export interface TreeProps {
  data: object[];
  mode?: 'nested' | 'column';
}

declare const Tree: React.FC<TreeProps>;

export { Tree };
