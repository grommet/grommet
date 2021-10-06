import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  AlignType,
  GapType,
  GridAreaType,
  MarginType,
  WidthType,
} from '../../utils';
export interface NameValueListProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  align?: {
    name?: AlignType;
    value?: AlignType;
  };
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
  gap?: GapType | { row?: GapType; column?: GapType };
}

declare const NameValueList: React.FC<NameValueListProps>;
export type NameValueListType = NameValueListProps;

export { NameValueList };
