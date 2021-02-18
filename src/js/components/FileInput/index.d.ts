import * as React from 'react';

export interface FileInputProps {
  disabled?: boolean;
  id?: string;
  messages?: {
    browse?: string;
    dropPrompt?: string;
    dropPromptMultiple?: string;
    files?: string;
    remove?: string;
    removeAll?: string;
  };
  multiple?: boolean | { aggregateThreshold?: number };
  name?: string;
  renderFile?: (...args: any[]) => void;
}

declare const FileInput: React.FC<FileInputProps &
  JSX.IntrinsicElements['input']>;

export { FileInput };
