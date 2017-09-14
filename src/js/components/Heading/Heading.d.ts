import * as React from 'react';
import Grommet from '../index';

export declare namespace HeadingTypes {
  type NoneSize = 'none';
  type Level = '1' | '2' | '3' | '4';
  type MarginSize = NoneSize | Size;
  type Margin = MarginSize | MarginSizeObject;
  type Size = 'small' | 'medium' | 'large';
  type TextAlign = 'start' | 'center' | 'end';
  interface MarginSizeObject {
    bottom: Size;
    top: Size;
  }
}

export interface HeadingProps extends Grommet.Props {
  level?: HeadingTypes.Level;
  margin?: HeadingTypes.Margin;
  size?: HeadingTypes.Size;
  textAlign?: HeadingTypes.TextAlign;
  truncate?: boolean;
}

export class Heading extends React.Component<HeadingProps, undefined> { }

export default Heading;
