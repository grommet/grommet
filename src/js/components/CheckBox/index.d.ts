import * as React from 'react';
import { ExtendType } from 'src/js/themes/base';
import {
  A11yTitleType,
  BackgroundType,
  BorderType,
  ColorType,
  ElevationType,
  PadType,
  RoundType,
} from '../../utils';

export interface CheckBoxProps {
  a11yTitle?: A11yTitleType;
  checked?: boolean;
  disabled?: boolean;
  fill?: boolean;
  id?: string;
  label?: React.ReactNode;
  name?: string;
  pad?: PadType;
  reverse?: boolean;
  toggle?: boolean;
  indeterminate?: boolean;
}

type inputType = JSX.IntrinsicElements['input'];

export interface CheckBoxExtendedProps extends CheckBoxProps, inputType {}

declare const CheckBox: React.FC<CheckBoxExtendedProps>;

export { CheckBox };
