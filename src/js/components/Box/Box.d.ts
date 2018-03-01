import * as React from "react";
import Grommet from '../index';

export declare namespace BoxTypes {
  type Size = 'small' | 'medium' | 'large';
  type NoneSize = 'none';
  type Alignment = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  type AlignContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  type AlignSelf = 'start' | 'center' | 'end' | 'stretch';
  type AnimationType = 'fadeIn' | 'fadeOut' | 'jiggle' | 'pulse' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut';
  interface AnimationObject {
    type?: AnimationType;
    delay?: number;
    duration?: number;
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  }
  type Basis = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  type BorderType = 'top' | 'left' | 'bottom' | 'right' | 'horizontal' | 'vertical' | 'all';
  interface BorderObject {
    color: string;
    side: BorderType,
    size: Size
  }
  type Border = BorderType | BorderObject;
  type Direction = 'row' | 'column';
  type Elevation = 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  type Flex = 'grow' | 'shrink' | boolean;
  type Fill = 'horizontal' | 'vertical' | boolean;
  type Gap = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  type Justify = 'start' | 'center' | 'between' | 'end';
  type JustifySelf = 'start' | 'center' | 'end' | 'stretch';
  type Overflow = 'auto' | 'hidden' | 'scroll';
  type RoundSize = 'xsmall' | 'small' | 'medium' | 'large' | 'full';
  interface BackgroundObject {
    color: string;
    dark: boolean;
    image: string;
    position: string;
    opacity: 'weak' | 'medium' | 'strong' | boolean;
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
  a11yTitle?: string;
  align?: BoxTypes.Alignment;
  alignContent?: BoxTypes.AlignContent;
  alignSelf?: BoxTypes.AlignSelf;
  animation?: BoxTypes.AnimationObject;
  background?: string | BoxTypes.BackgroundObject;
  basis?: BoxTypes.Basis;
  border?: BoxTypes.Border;
  direction?: BoxTypes.Direction;
  elevation?: BoxTypes.Elevation;
  flex?: BoxTypes.Flex;
  fill?: BoxTypes.Fill;
  gap?: BoxTypes.Gap;
  gridArea?: string;
  justify?: BoxTypes.Justify;
  justifySelf?: BoxTypes.JustifySelf;
  margin?: BoxTypes.Size | BoxTypes.SizeObject | BoxTypes.NoneSize;
  overflow?: BoxTypes.Overflow;
  pad?: BoxTypes.Size | BoxTypes.SizeObject | BoxTypes.NoneSize;
  responsive?: boolean;
  round?: BoxTypes.RoundSize;
  tag?: string;
  wrap?: boolean;
}

export class Box extends React.Component<BoxProps, undefined> { }

export default Box;
