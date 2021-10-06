import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  AlignType,
  GapType,
  GridAreaType,
  MarginType,
} from '../../utils';
import { GridColumnsType } from '../Grid/index';

export interface NameValueListProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  align?: {
    name?: AlignType;
    value?: AlignType;
  };
  columns?: GridColumnsType;
  direction?: {
    list?: 'column' | 'row';
    property?: 'column' | 'column-reverse' | 'row';
  };
  gap?: GapType | { row?: GapType; column?: GapType };
}

declare const NameValueList: React.FC<NameValueListProps>;
export type NameValueListType = NameValueListProps;

export { NameValueList };
