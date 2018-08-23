import * as React from "react";

export interface TextAreaProps {
  id: string;
  focusIndicator: boolean;
  name: string;
  placeholder: string;
  plain: boolean;
  value: string;
}

declare const TextArea: React.ComponentType<TextAreaProps>;

export { TextArea };
