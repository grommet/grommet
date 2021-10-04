import * as React from 'react';
import { TextType } from 'grommet';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface PropertyProps {
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

declare const Property: React.FC<PropertyProps>;
export type PropertyType = PropertyProps;

export { Property };
