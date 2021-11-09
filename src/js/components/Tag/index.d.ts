import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  BackgroundType,
  GridAreaType,
  MarginType,
  // Omit,
  PolymorphicType,
} from '../../utils';

export interface TagProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  name?: string;
  value: string | number;
  onClick?: (...args: any[]) => any;
  onRemove?: (...args: any[]) => any;
  size?: 'small' | 'medium' | 'large';
  as?: PolymorphicType;
}

export interface TagExtendedProps extends TagProps {}

// Keep type alias for backwards compatibility.
export type TagType = TagProps;

declare const Tag: React.FC<
  TagExtendedProps
>;

export { Tag };