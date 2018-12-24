export type GrommetSizeSToXL = 'small' | 'medium' | 'large' | 'xlarge';
export type GrommetSizeXSToXL = 'xsmall' | GrommetSizeSToXL;
export type GrommetSizeXXSToXL = 'xxsmall' | GrommetSizeXSToXL;

export type GrommetMargin = 'none' | GrommetSizeXXSToXL | {
  bottom: GrommetSizeXXSToXL | string,
  horizontal: GrommetSizeXXSToXL | string,
  left: GrommetSizeXXSToXL | string,
  right: GrommetSizeXXSToXL | string,
  top: GrommetSizeXXSToXL | string,
  vertical: GrommetSizeXXSToXL | string,
} | string;

export type AnyFunction = (...args: any[]) => any;

export type GrommetAlignSelfOrJustify = 'start' | 'center' | 'end' | 'stretch';
