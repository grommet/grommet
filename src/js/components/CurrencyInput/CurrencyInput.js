import React, { forwardRef, useCallback, useMemo } from 'react';
import { getCurrency } from 'locale-currency';

import { TextInput } from '../TextInput';

const currentLocale =
  typeof window === 'undefined'
    ? 'en-US'
    : window.navigator.language || 'en-US';
const localCurrency = getCurrency(currentLocale) || 'USD';

const CurrencyInput = forwardRef(
  (
    {
      currency = localCurrency,
      locale = currentLocale,
      value,
      onBlur,
      onChange = () => {},
      numberFormatOptions = {},
      ...rest
    },
    ref,
  ) => {
    const valueString = useMemo(() => `${value || ''}`, [value]);

    const decimalSeparator = useMemo(() => {
      const { format } = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      });
      return format(0.1).replace(/[^,.]/g, '');
    }, [locale, currency]);

    const minimumFractionDigits = useMemo(
      () => (new RegExp(`\\${decimalSeparator}\\d`).test(valueString) ? 1 : 0),
      [decimalSeparator, valueString],
    );

    const { format } = useMemo(
      () =>
        new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          minimumFractionDigits,
          maximumFractionDigits: 2,
          ...numberFormatOptions,
        }),
      [locale, numberFormatOptions, currency, minimumFractionDigits],
    );

    const maskedValue = useMemo(() => {
      if (!valueString || valueString === '-') {
        return valueString;
      }
      const lastChar = valueString.slice(-1);
      if (lastChar === '.' || lastChar === ',') {
        return `${format(Number(valueString.slice(0, -1)))}${lastChar}`;
      }
      return format(Number(valueString.replace(decimalSeparator, '.')));
    }, [valueString, format, decimalSeparator]);

    const onInputChange = useCallback(
      (event, ...other) => {
        let newValue = event.target.value.replace(
          new RegExp(`[^0-9${decimalSeparator}-]`, 'g'),
          '',
        );
        if (newValue.endsWith('-') && newValue.length > 1) {
          newValue = newValue.slice(0, -1);
        }
        if (
          newValue.endsWith(decimalSeparator) &&
          newValue.split(decimalSeparator).length > 2
        ) {
          newValue = newValue.slice(0, -1);
        }
        if (onChange) {
          onChange(
            {
              ...event,
              target: {
                ...event.target,
                value: newValue,
              },
            },
            ...other,
          );
        }
      },
      [onChange, decimalSeparator],
    );

    const onFormat = useCallback(
      (event, ...other) => {
        if (valueString.endsWith(decimalSeparator) && onChange) {
          onChange(
            {
              ...event,
              target: {
                ...event.target,
                value: valueString.slice(0, -1),
              },
            },
            ...other,
          );
        }
        if (onBlur) {
          onBlur(event, ...other);
        }
      },
      [onChange, decimalSeparator, valueString, onBlur],
    );

    return (
      <TextInput
        ref={ref}
        value={maskedValue}
        onChange={onInputChange}
        onBlur={onFormat}
        {...rest}
      />
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';

let CurrencyInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CurrencyInputDoc = require('./doc').doc(CurrencyInput);
}
const CurrencyInputWrapper = CurrencyInputDoc || CurrencyInput;

export { CurrencyInputWrapper as CurrencyInput };
