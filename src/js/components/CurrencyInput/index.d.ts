import * as React from 'react';
import { TextInputProps } from '../TextInput';

export interface CurrencyInputProps {
  currency?: string;
  locale?: string;
  numberFormatOptions?: object;
}

declare const CurrencyInput: React.FC<TextInputProps & CurrencyInputProps>;

export { CurrencyInput };
