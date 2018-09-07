import * as React from "react";

export interface RangeInputProps {
  id?: string;
  min?: number | string;
  max?: number | string;
  name?: string;
  onChange?: (...args: any[]) => any;
  step?: number;
  value?: number | string;
}

declare const RangeInput: React.ComponentType<RangeInputProps>;

export { RangeInput };
