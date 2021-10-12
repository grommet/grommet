import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface NameValuePairProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  children?: string | number | React.ReactElement;
  gridArea?: GridAreaType;
  margin?: MarginType;
  name?: string | JSX.Element;
}

declare const NameValuePair: React.FC<NameValuePairProps>;
export type NameValuePairType = NameValuePairProps;

export { NameValuePair };
