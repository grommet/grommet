import * as React from 'react';
import Grommet from '../index';

export declare namespace GridTypes {
  type Size = 'small' | 'medium' | 'large' | 'none';
  type Align = 'start' | 'center' | 'end' | 'stretch';
  type AlignContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  type ColumnSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'flex';
  type GapSize = Size | SizeObject;
  type Justify = 'start' | 'center' | 'end' | 'stretch';
  type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  type RowSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'flex';
  interface Areas { name: string; }
  interface SizeObject {
    horizontal: Size;
    vertical: Size;
  }
}

export interface GridProps extends Grommet.Props {
  align?: GridTypes.Align;
  alignContent?: GridTypes.AlignContent;
  areas?: GridTypes.Areas;
  columns?: GridTypes.ColumnSize;
  gap?: GridTypes.GapSize;
  justify?: GridTypes.Justify;
  justifyContent?: GridTypes.JustifyContent;
  rows?: GridTypes.RowSize;
  tag?: string;
}

export class Grid extends React.Component<GridProps, undefined> { }

export default Grid;
