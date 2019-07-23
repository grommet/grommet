import * as React from "react";

export interface MaskedInputProps {
  id?: string;
  name?: string;
  onChange?: ((...args: any[]) => any);
  onBlur?: ((...args: any[]) => any);
  mask?: Array<{
    length?: number | number[];
    fixed?: string;
    options?: string[] | number[];
    regexp?: {};
    placeholder?: string;
  }>;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string | number;
}

declare const MaskedInput: React.ComponentClass<
    MaskedInputProps & Omit<JSX.IntrinsicElements['input'], 'size'>
>;

export { MaskedInput };
