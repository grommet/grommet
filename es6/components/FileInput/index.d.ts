import * as React from 'react';

export interface FileInputProps {
  confirmRemove?: ({
    onConfirm,
    onCancel,
  }: {
    onConfirm: any;
    onCancel: any;
  }) => React.ReactElement;
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
  name?: string;
  renderFile?: (...args: any[]) => void;
}

type inputProps = Omit<JSX.IntrinsicElements['input'], 'multiple'>;

export interface FileInputExtendedProps extends FileInputProps, inputProps {}

declare const FileInput: React.FC<FileInputExtendedProps>;

export { FileInput };
