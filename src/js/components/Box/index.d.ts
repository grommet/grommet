import * as React from "react";

export interface BoxProps {
  a11yTitle?: string;
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  alignContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  alignSelf?: "start" | "center" | "end" | "stretch";
  animation?: "fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut" | {type: "fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut",delay: number,duration: number,size: "xsmall" | "small" | "medium" | "large" | "xlarge"} | "fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut" | {type: "fadeIn" | "fadeOut" | "jiggle" | "pulse" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut",delay: number,duration: number,size: "xsmall" | "small" | "medium" | "large" | "xlarge"}[];
  background?: string | {color: string,dark: boolean,image: string,position: string,opacity: "weak" | "medium" | "strong" | boolean};
  basis?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4" | "auto";
  border?: "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all" | {color: string,side: "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all",size: "small" | "medium" | "large"};
  direction?: "row" | "column" | "row-responsive";
  elevation?: "none" | "xsmall" | "small" | "medium" | "large" | "xlarge";
  flex?: "grow" | "shrink" | "true" | "false";
  fill?: "horizontal" | "vertical" | "true" | "false";
  gap?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  gridArea?: string;
  height?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  justify?: "start" | "center" | "between" | "end";
  margin?: "none" | "xsmall" | "small" | "medium" | "large" | {bottom: "xsmall" | "small" | "medium" | "large",horizontal: "xsmall" | "small" | "medium" | "large",left: "xsmall" | "small" | "medium" | "large",right: "xsmall" | "small" | "medium" | "large",top: "xsmall" | "small" | "medium" | "large",vertical: "xsmall" | "small" | "medium" | "large"};
  overflow?: "auto" | "hidden" | "scroll";
  pad?: "none" | "xsmall" | "small" | "medium" | "large" | {bottom: "xsmall" | "small" | "medium" | "large",horizontal: "xsmall" | "small" | "medium" | "large",left: "xsmall" | "small" | "medium" | "large",right: "xsmall" | "small" | "medium" | "large",top: "xsmall" | "small" | "medium" | "large",vertical: "xsmall" | "small" | "medium" | "large"};
  responsive?: boolean;
  round?: "xsmall" | "small" | "medium" | "large" | "full";
  tag?: string;
  width?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  wrap?: boolean;
}

declare const Box: React.ComponentType<BoxProps>;

export { Box };
