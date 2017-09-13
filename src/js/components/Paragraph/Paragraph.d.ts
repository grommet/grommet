import * as React from 'react';
import Grommet from '../index';

export declare namespace ParagraphTypes {
  type NoneSize = 'none';
  type Size = 'small' | 'medium' | 'large' | 'xlarge';
  type MarginSize = 'small' | 'medium' | 'large';
  interface MarginSizeObject {
    bottom: Size;
    top: Size;
  }
  type TextAlignment = 'start' | 'center' | 'end';
}

export interface ParagraphProps extends Grommet.Props {
  margin?: string | ParagraphTypes.MarginSize | ParagraphTypes.MarginSizeObject | ParagraphTypes.NoneSize;
  size?: ParagraphTypes.Size;
  textAlign?: ParagraphTypes.TextAlignment;
}

export class Paragraph extends React.Component<ParagraphProps, undefined> { }

export default Paragraph;
