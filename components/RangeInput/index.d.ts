import * as React from "react";

export interface RangeInputProps {
  id?: string;
  min?: number | string;
  max?: number | string;
  name?: string;
  onChange?: ((...args: any[]) => void);
  step?: number;
  value?: number | string;
}

declare const RangeInput: React.FC<RangeInputProps & JSX.IntrinsicElements['input']>;

export { RangeInput };
