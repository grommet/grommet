import * as React from "react";
import Grommet from '../index';

export declare namespace BoxTypes {
  type Size = 'small' | 'medium' | 'large';
  interface SideSize {
    bottom: Size;
    horizontal: Size;
    left: Size;
    right: Size;
    top: Size;
    vertical: Size;
  }
}

export interface BoxProps extends Grommet.Props {
  align: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  alignContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  alignSelf: 'start' | 'center' | 'end' | 'stretch';
  background: string | { dark: boolean, image: string };
  basis: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  border: 'top' | 'left' | 'bottom' | 'right' | 'horizontal' | 'vertical' | 'all' | { color: string, side: 'top' | 'left' | 'bottom' | 'right' | 'horizontal' | 'vertical' | 'all', size: 'small' | 'medium' | 'large' };
  direction: 'row' | 'column';
  flex: 'grow' | 'shrink' | true | false;
  full: 'horizontal' | 'vertical' | true | false | 'grow';
  gridArea: string;
  justify: 'start' | 'center' | 'between' | 'end';
  justifySelf: 'start' | 'center' | 'end' | 'stretch';
  margin: BoxTypes.Size | BoxTypes.SideSize | 'none';
  padding: BoxTypes.Size | BoxTypes.SideSize | 'none';
  reverse: boolean;
  round: 'xsmall' | 'small' | 'medium' | 'large' | 'full';
  tag: string;
  textAlign: 'start' | 'center' | 'end';
  wrap: boolean;
}

export class Box extends React.Component<BoxProps, undefined> { }

export default Box;
