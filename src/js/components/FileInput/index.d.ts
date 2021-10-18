import * as React from 'react';

import { BorderType, PadType, MarginType, BackgroundType } from '../../utils';

export interface FileInputProps {
  border?: BorderType;
  background?: BackgroundType;
  disabled?: boolean;
  id?: string;
  maxSize?: number;
  messages?: {
    browse?: string;
    dropPrompt?: string;
    dropPromptMultiple?: string;
    files?: string;
    remove?: string;
    removeAll?: string;
    maxFile?: string;
  };
  multiple?: boolean | { aggregateThreshold?: number; max?: number };
  margin?: MarginType;
  name?: string;
  pad?: PadType;
  renderFile?: (...args: any[]) => void;
}

type inputProps = Omit<JSX.IntrinsicElements['input'], 'multiple'>;

export interface FileInputExtendedProps extends FileInputProps, inputProps {}

declare const FileInput: React.FC<FileInputExtendedProps>;

export { FileInput };
