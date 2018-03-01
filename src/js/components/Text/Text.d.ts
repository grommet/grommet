

import * as React from 'react';
import Grommet from '../index';

export declare namespace TextTypes {
  type NoneSize = 'none';
  type MarginSize = 'small' | 'medium' | 'large';
  type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  interface SizeObject {
    bottom: MarginSize;
    top: MarginSize;
  }
  type TextAlign = 'start' | 'center' | 'end';
}

export interface TextProps extends Grommet.Props {
  margin?: TextTypes.NoneSize | TextTypes.Size | TextTypes.SizeObject;
  size?: TextTypes.Size;
  tag?: string;
  textAlign?: TextTypes.TextAlign;
  truncate?: boolean;
}

export class Text extends React.Component<TextProps, undefined> { }

export default Text;
