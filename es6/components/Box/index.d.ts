import * as React from "react";
import { PolymorphicType } from "../../utils";


export interface BoxProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  alignContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  animation?: "fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut" | {type?: "fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut",delay?: number,duration?: number,size?: "xsmall" | "small" | "medium" | "large" | "xlarge"} | ("fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut" | {type?: "fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut",delay?: number,duration?: number,size?: "xsmall" | "small" | "medium" | "large" | "xlarge"})[];
  background?: string | {color?: string,dark?: boolean | string,image?: string,position?: string,opacity?: "weak" | "medium" | "strong" | number | boolean,repeat?: "no-repeat" | "repeat" | string,size?: "cover" | "contain" | string,light?: string};
  basis?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "auto" | string;
  border?: boolean | "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all" | {color?: string | {dark?: string,light?: string},side?: "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all",size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string,style?: "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset" | "hidden"};
  direction?: "row" | "column" | "row-responsive" | 'row-reverse' | 'column-reverse';
  elevation?: "none" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  flex?: "grow" | "shrink" | boolean | {grow?: number,shrink?: number};
  fill?: "horizontal" | "vertical" | boolean;
  gap?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  height?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  justify?: "start" | "center" | "between" | "around" | "evenly" | "end";
  overflow?: "auto" | "hidden" | "scroll" | "visible" | {horizontal?: "auto" | "hidden" | "scroll" | "visible",vertical?: "auto" | "hidden" | "scroll" | "visible"} | string;
  pad?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  responsive?: boolean;
  round?: boolean | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string | {corner?: "top" | "left" | "bottom" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right",size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string};
  tag?: PolymorphicType;
  as?: PolymorphicType;
  width?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" |string;
  wrap?: boolean | "reverse";
}

declare const Box: React.ComponentClass<BoxProps & JSX.IntrinsicElements['div']>;

export { Box };
