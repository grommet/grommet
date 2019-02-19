import * as React from "react";

export interface MaskedInputProps {
  id?: string;
  name?: string;
  onChange?: ((...args: any[]) => any);
  onBlur?: ((...args: any[]) => any);
  mask?: Array<{
    length?: number | number[];
    fixed?: string;
    options?: string[];
    regexp?: {};
    placeholder?: string;
  }>;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string;
}

declare const MaskedInput: React.ComponentClass<MaskedInputProps & JSX.IntrinsicElements['input']>;

export { MaskedInput };
