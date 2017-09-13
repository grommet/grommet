import * as React from "react";
import Grommet from '../index';

export declare namespace BoxTypes {
  type Size = 'small' | 'medium' | 'large';
  type NoneSize = 'none';
  type Alignment = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  type AlignContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  type AlignSelf = 'start' | 'center' | 'end' | 'stretch';
  type Basis = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  type Border = 'top' | 'left' | 'bottom' | 'right' | 'horizontal' | 'vertical' | 'all';
  type Direction = 'row' | 'column';
  type Flex = 'grow' | 'shrink' | boolean;
  type Full = 'horizontal' | 'vertical' | 'grow' | boolean;
  type Justify = 'start' | 'center' | 'between' | 'end';
  type JustifySelf = 'start' | 'center' | 'end' | 'stretch';
  type RoundSize = 'xsmall' | 'small' | 'medium' | 'large' | 'full';
  type TextAlign = 'start' | 'center' | 'end';
  interface BackgroundObject { dark: boolean; image: string; }
  interface BorderObject {
    color: string;
    side: Border,
    size: Size
  }
  interface SizeObject {
    bottom: Size;
    horizontal: Size;
    left: Size;
    right: Size;
    top: Size;
    vertical: Size;
  }
}

export interface BoxProps extends Grommet.Props {
  align?: BoxTypes.Alignment;
  alignContent?: BoxTypes.AlignContent;
  alignSelf?: BoxTypes.AlignSelf;
  background?: string | BoxTypes.BackgroundObject;
  basis?: BoxTypes.Basis;
  border?: BoxTypes.Border | BoxTypes.BorderObject;
  direction?: BoxTypes.Direction;
  flex?: BoxTypes.Flex;
  full?: BoxTypes.Full;
  gridArea?: string;
  justify?: BoxTypes.Justify;
  justifySelf?: BoxTypes.JustifySelf;
  margin?: BoxTypes.Size | BoxTypes.SizeObject | BoxTypes.NoneSize;
  padding?: BoxTypes.Size | BoxTypes.SizeObject | BoxTypes.NoneSize;
  reverse?: boolean;
  round?: BoxTypes.RoundSize;
  tag?: string;
  textAlign?: BoxTypes.TextAlign;
  wrap?: boolean;
}

export class Box extends React.Component<BoxProps, undefined> { }

export default Box;
