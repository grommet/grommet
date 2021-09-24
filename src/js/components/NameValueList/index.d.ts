import * as React from 'react';
import { A11yTitleType } from '../../utils';
import { BoxTypes } from '../Box';
import { TextProps } from '../Text';

export interface NameValueListProps {
  a11yTitle?: A11yTitleType;
  data?: [
    {
      name?: string;
      value?: string;
      nameVisual?: React.ReactNode;
      valueVisual?: React.ReactNode;
    },
  ];
  layout?: string;
  pairProps?: BoxTypes;
  nameProps?: TextProps;
  listProps?: BoxTypes;
  valueProps?: TextProps;
  align?: {
    name?: string;
    value?: string;
  };
}

declare const NameValueListProps: React.ComponentClass<NameValueListProps>;

export { NameValueListProps };
