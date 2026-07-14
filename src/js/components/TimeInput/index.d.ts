import * as React from 'react';

export interface TimeInputProps {
  defaultValue?: string;
  disabled?: boolean;
  format?: '12' | '24';
  id?: string;
  messages?: {
    chooseTime?: string;
    currentValue?: string;
    enterDrop?: string;
    exitDrop?: string;
    inputLabel?: string;
    invalidTime?: string;
    openDrop?: string;
  };
  minuteStep?: number;
  name?: string;
  onChange?: (event: { value?: string }) => void;
  readOnly?: boolean;
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
