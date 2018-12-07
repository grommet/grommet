import * as React from "react";

export interface MaskedInputProps {
  id?: string;
  name?: string;
  onChange?: (...args: any[]) => any;
  mask?: {length?: number | number[],fixed?: string,options?: string[],regexp?: {}}[];
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string;
}

declare const MaskedInput: React.ComponentType<MaskedInputProps>;

export { MaskedInput };
