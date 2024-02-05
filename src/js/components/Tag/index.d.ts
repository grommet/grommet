import * as React from 'react';
import { BoxProps } from '../Box';

export interface TagProps {
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

export interface TagExtendedProps extends BoxProps, TagProps {}

// Keep type alias for backwards compatibility.
export type TagType = TagProps;

declare const Tag: React.FC<TagExtendedProps>;

export { Tag };
