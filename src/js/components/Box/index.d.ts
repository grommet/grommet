import * as React from 'react';
import {
  GrommetAlignSelfOrJustify,
  GrommetMargin, GrommetSizeXSToXL,
  GrommetSizeXXSToXL,
} from '../../types/common';

export interface BoxProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  animation?: 'fadeIn' | 'fadeOut' | 'jiggle' | 'pulse' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut' | {type: 'fadeIn' | 'fadeOut' | 'jiggle' | 'pulse' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut', delay: number, duration: number, size: GrommetSizeXSToXL} | 'fadeIn' | 'fadeOut' | 'jiggle' | 'pulse' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut' | {type: 'fadeIn' | 'fadeOut' | 'jiggle' | 'pulse' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut', delay: number, duration: number, size: GrommetSizeXSToXL}[];
  background?: string | {
    color?: string, dark?: boolean | string,
    image?: string,
    position?: string,
    opacity?: 'weak' | 'medium' | 'strong' | boolean,
    light?: string,
  };
  basis?: GrommetSizeXXSToXL | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'auto' | string;
  border?: boolean | 'top' | 'left' | 'bottom' | 'right' | 'horizontal' | 'vertical' | 'all' | {
    color?: string | { dark?: string, light?: string },
    side?: 'top' | 'left' | 'bottom' | 'right' | 'horizontal' | 'vertical' | 'all',
    size?: GrommetSizeXSToXL | string,
  };
  direction?: 'row' | 'column' | 'row-responsive';
  elevation?: 'none' | GrommetSizeXSToXL | string;
  flex?: 'grow' | 'shrink' | boolean;
  fill?: 'horizontal' | 'vertical' | boolean;
  gap?: GrommetSizeXSToXL | string;
  height?: GrommetSizeXSToXL | string;
  justify?: 'start' | 'center' | 'between' | 'end';
  overflow?: 'auto' | 'hidden' | 'scroll' | 'visible' | {horizontal: 'auto' | 'hidden' | 'scroll' | 'visible', vertical: 'auto' | 'hidden' | 'scroll' | 'visible'} | string;
  pad?: 'none' | GrommetSizeXXSToXL | Partial<{
    bottom: GrommetSizeXXSToXL | string,
    horizontal: GrommetSizeXXSToXL | string,
    left: GrommetSizeXXSToXL | string,
    right: GrommetSizeXXSToXL | string,
    top: GrommetSizeXXSToXL | string,
    vertical: GrommetSizeXXSToXL | string,
  }> | string;
  responsive?: boolean;
  round?: boolean | GrommetSizeXSToXL | 'full' | string | {corner?: 'top' | 'left' | 'bottom' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', size?: GrommetSizeXSToXL | string};
  tag?: string;
  as?: string;
  width?: GrommetSizeXSToXL | string;
  wrap?: boolean;
}

declare const Box: React.ComponentType<BoxProps>;

export { Box };
