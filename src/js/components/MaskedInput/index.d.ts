import * as React from "react";

export interface MaskedInputProps {
  id?: string;
  name?: string;
  onChange?: (...args: any[]) => any;
  mask?: {length: number | number[],onActive: (...args: any[]) => any,onInactive: (...args: any[]) => any,fixed: string,options: string[]}[];
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string;
}

declare const MaskedInput: React.ComponentType<MaskedInputProps>;

export { MaskedInput };
