import * as React from "react";
import { RadioButtonGroupProps } from '../RadioButtonGroup' 

export interface SwitchProps {}

declare const Switch: React.ComponentClass<SwitchProps & RadioButtonGroupProps & JSX.IntrinsicElements['div']>;

export { Switch };
