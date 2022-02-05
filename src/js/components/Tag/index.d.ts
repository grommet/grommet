import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  PolymorphicType,
} from '../../utils';

export interface TagProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: PolymorphicType;
  gridArea?: GridAreaType;
  name?: string;
  onClick?: (...args: any[]) => any;
  onRemove?: (...args: any[]) => any;
  size?:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | string;
  value: string | number;
}

export interface TagExtendedProps extends TagProps {}

// Keep type alias for backwards compatibility.
export type TagType = TagProps;

declare const Tag: React.FC<TagExtendedProps>;

export { Tag };
