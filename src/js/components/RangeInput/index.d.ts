import * as React from "react";

export interface RangeInputProps {
  id?: string;
  min?: number;
  max?: number;
  name?: string;
  onChange?: (...args: any[]) => any;
  step?: number;
  value?: number;
}

declare const RangeInput: React.StatelessComponent<RangeInputProps>;

export { RangeInput };
