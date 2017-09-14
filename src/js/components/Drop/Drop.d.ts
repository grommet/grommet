import * as React from 'react';
import Grommet from '../index';

export declare namespace DropTypes {
  type Direction = "rtl" | "ltr";
  type VerticalAlign = 'bottom' | 'top';
  type HorizontalAlign = 'right' | 'left';
  interface Background { dark: boolean; image: string };
  interface AlignObject { 
    top: VerticalAlign;
    bottom: VerticalAlign;
    right: HorizontalAlign;
    left: HorizontalAlign;
  }
}

export interface DropProps extends Grommet.Props {
  align?: DropTypes.AlignObject;
  background?: string | DropTypes.Background;
  control: {};
  dir?: DropTypes.Direction;
  onClose?: Function;
  responsive?: boolean;
  theme?: {};
}

export class Drop extends React.Component<DropProps, undefined> { }

export default Drop;
