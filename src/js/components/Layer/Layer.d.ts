import * as React from 'react';
import Grommet from '../index';

export declare namespace LayerTypes {
  type Align = 'center' | 'top' | 'bottom' | 'left' | 'right';
  type Size = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'full';
}

export interface LayerProps extends Grommet.Props {
  align?: LayerTypes.Align;
  context?: {};
  onEsc?: Function;
  size?: LayerTypes.Size;
}

export class Layer extends React.Component<LayerProps, undefined> { }

export default Layer;
