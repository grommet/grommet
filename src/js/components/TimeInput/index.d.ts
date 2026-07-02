import * as React from 'react';
import type { JSX } from 'react';

import { ButtonType } from '../Button';
import { DropType } from '../Drop';

export interface TimeInputProps {
  buttonProps?: ButtonType;
  defaultValue?: string;
  disabled?: boolean;
  dropProps?: DropType;
  format?: '12' | '24';
  focusIndicator?: boolean;
  icon?: JSX.Element;
  id?: string;
  messages?: {
    activePeriodValue?: string;
    activeSection?: string;
    activeSectionValue?: string;
    chooseTime?: string;
    currentValue12?: string;
    currentValue24?: string;
    enterPicker?: string;
    exitPicker?: string;
    inputLabel?: string;
    invalidTime?: string;
    openPicker?: string;
  };
  minuteStep?: number;
  name?: string;
  onAccept?: (time?: string) => void;
  onChange?: (event: { value?: string }) => void;
  onClose?: () => void;
  onError?: (error?: string) => void;
  onOpen?: () => void;
  plain?: boolean;
  readOnly?: boolean;
  secondStep?: number;
  views?: ('hours' | 'minutes' | 'seconds' | 'meridiem')[];
  value?: string;
}

export interface TimeInputExtendedProps
  extends TimeInputProps,
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      'defaultValue' | 'onChange' | 'onError' | 'size' | 'value'
    > {}

declare const TimeInput: React.FC<TimeInputExtendedProps>;

export { TimeInput };
