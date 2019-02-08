import * as React from "react";

export interface TextAreaProps {
  id?: string;
  fill?: boolean;
  focusIndicator?: boolean;
  name?: string;
  onChange?: ((...args: any[]) => any);
  placeholder?: string;
  plain?: boolean;
  value?: string;
  resize?: "vertical" | "horizontal" | boolean;
}

declare const TextArea: React.ComponentType<TextAreaProps & JSX.IntrinsicElements['textarea']>;

export { TextArea };
