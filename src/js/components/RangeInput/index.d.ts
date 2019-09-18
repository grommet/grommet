import * as React from "react";

export interface RangeInputProps {
  id?: string;
  min?: number | string;
  max?: number | string;
  name?: string;
  onChange?: ((event: React.ChangeEvent) => void);
  step?: number;
  value?: number | string;
}

declare const RangeInput: React.ComponentClass<RangeInputProps & JSX.IntrinsicElements['input']>;

export { RangeInput };
