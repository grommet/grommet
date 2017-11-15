import * as React from 'react';
import Grommet from '../index';

export declare namespace MeterTypes {
  type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full';
  type Thickness = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  type Type = 'bar' | 'circle';
  interface Value {
    color?: string;
    highlight?: boolean;
    label?: string;
    onClick?: Function;
    onHover?: Function;
  }
}

export interface MeterProps extends Grommet.Props {
  background?: string;
  round?: boolean;
  size?: MeterTypes.Size;
  thickness?: MeterTypes.Thickness;
  type?: MeterTypes.Type;
  values?: MeterTypes.Value[];
}

export class Meter extends React.Component<MeterProps, undefined> { }

export default Meter;
