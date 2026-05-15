import * as React from 'react';
import { BoxProps } from '../Box';

export interface TagProps {
  children?: React.ReactNode;
  name?: string | React.ReactNode;
  onClick?: (...args: any[]) => any;
  onRemove?: (...args: any[]) => any;
  messages?: {
    removeLabel?: {
      nameAndValue?: string;
      valueOnly?: string;
    };
  };
  size?:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | string;
  value?: string | number | React.ReactNode;
}

export interface TagExtendedProps extends BoxProps, TagProps {}

// Keep type alias for backwards compatibility.
export type TagType = TagProps;

declare const Tag: React.FC<TagExtendedProps>;

export { Tag };
