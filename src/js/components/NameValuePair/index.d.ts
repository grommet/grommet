import * as React from 'react';
import { TextType } from '../Text';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface NameValuePairProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  children?: (...args: any[]) => any;
  name?: string | JSX.Element;
  nameProps?: TextType;
  value?: string | JSX.Element;
  valueProps?: TextType;
}

declare const NameValuePair: React.FC<NameValuePairProps>;
export type NameValuePairType = NameValuePairProps;

export { NameValuePair };
