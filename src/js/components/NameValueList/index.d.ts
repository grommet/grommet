import * as React from 'react';
import { A11yTitleType, AlignType, GapType, WidthType } from '../../utils';
export interface NameValueListProps {
  align?: AlignType;
  layout?: 'column' | 'grid';
  nameProps?: {
    align?: AlignType;
    width?: WidthType;
  };
  pairProps?: {
    direction?: 'column' | 'column-reverse' | 'row';
  };
  valueProps?: {
    align?: AlignType;
    width?: WidthType;
  };
}
export interface NameValueListExtendedProps
  extends NameValueListProps,
    Omit<JSX.IntrinsicElements['dl'], keyof NameValueListProps> {}

declare const NameValueList: React.FC<NameValueListProps>;

export { NameValueList };
