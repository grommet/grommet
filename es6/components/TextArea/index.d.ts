import * as React from "react";

export interface TextAreaProps {
  id?: string;
  fill?: "true" | "false";
  focusIndicator?: boolean;
  name?: string;
  onChange?: (...args: any[]) => any;
  placeholder?: string;
  plain?: boolean;
  value?: string;
}

declare const TextArea: React.ComponentType<TextAreaProps>;

export { TextArea };
