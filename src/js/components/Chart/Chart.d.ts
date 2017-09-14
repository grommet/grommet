import * as React from 'react';
import Grommet from '../index';

export declare namespace ChartTypes {
  type Bound = number[];
  type SizeOption = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full';
  type Size = SizeOption | SizeObject;
  type Type = 'bar' | 'line' | 'area';
  type Thickness = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  interface SizeObject {
    height?: SizeOption;
    width?: SizeOption;
  }
  interface Value {
    label?: string;
  }
}

export interface ChartProps extends Grommet.Props {
  bounds?: ChartTypes.Bound[];
  color?: string;
  round?: boolean;
  size?: ChartTypes.Size;
  thickness?: ChartTypes.Thickness;
  title?: string;
  type?: ChartTypes.Type;
  values?: ChartTypes.Value;
}

export class Chart extends React.Component<ChartProps, undefined> { }

export default Chart;
