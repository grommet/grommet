import { BoxTypes } from 'grommet';
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
  data?: {
    name?: string;
    nameIcon?: React.ReactElement;
    value?: string;
    valueIcon?: React.ReactElement;
  }[];
  direction?: { list?: 'column' | 'row'; pair?: 'column' | 'row' };
  gap?: GapType | { row?: GapType; column?: GapType };
  nameProps?: BoxTypes;
  valueProps?: BoxTypes;
}

declare const NameValueList: React.FC<NameValueListProps>;
export type NameValueListType = NameValueListProps;

export { NameValueList };
