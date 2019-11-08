import * as React from "react";

export interface TextAreaProps {
  fill?: boolean;
  focusIndicator?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  plain?: boolean;
  resize?: "vertical" | "horizontal" | boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string;
}

declare const TextArea: React.FC<TextAreaProps & JSX.IntrinsicElements['textarea']>;

export { TextArea };
