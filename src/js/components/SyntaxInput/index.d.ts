import * as React from "react";

export interface SyntaxInputProps {
  id?: string;
  name?: string;
  onChange?: (...args: any[]) => any;
  schema?: {length: number | number[],onActive: (...args: any[]) => any,onInactive: (...args: any[]) => any,fixed: string,options: string[]}[];
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string;
}

declare const SyntaxInput: React.ComponentType<SyntaxInputProps>;

export { SyntaxInput };
