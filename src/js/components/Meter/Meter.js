import React, { forwardRef, useContext, useMemo } from 'react';

import { Bar } from './Bar';
import { Circle } from './Circle';
import { MeterPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

const deriveMax = (values) => {
  let max = 100;
  if (values && values.length > 1) {
    max = 0;
    values.forEach((v) => {
      max += v.value;
    });
  }
  return max;
};

const Meter = forwardRef(
  (
    {
      ariaLabel,
      background = { color: 'light-2', opacity: 'medium' },
      color,
      direction = 'horizontal',
      messages,
      size = 'medium',
      thickness = 'medium',
      type = 'bar',
      reverse: reverseProp,
      value,
      values: valuesProp,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useThemeValue();
    const { format } = useContext(MessageContext);

    // normalize values to an array of objects
    const values = useMemo(() => {
      if (valuesProp) return valuesProp;
      if (value) return [{ color, value }];
      return [];
    }, [color, value, valuesProp]);

    const reverse =
      direction === 'horizontal' &&
      (theme.dir === 'rtl' || reverseProp) &&
      !(theme.dir === 'rtl' && reverseProp);

    let meterType;

    switch (type) {
      case 'bar':
        meterType = 'meter.bar';
        break;
      case 'semicircle':
        meterType = 'meter.semicircle';
        break;
      case 'pie':
        meterType = 'meter.pie';
        break;
      default:
        meterType = 'meter.circle';
        break;
    }

    const meterAriaLabel =
      ariaLabel ||
      format({
        id: meterType,
        messages: messages?.meter,
        values: {
          percentage:
            value !== undefined ? value : values.map((item) => item.value),
          type,
        },
      });

    const memoizedMax = useMemo(() => deriveMax(values), [values]);
    let content;
    if (type === 'bar') {
      content = (
        <Bar
          ref={ref}
          aria-label={meterAriaLabel}
          max={memoizedMax}
          values={values}
          size={size}
          thickness={thickness}
          background={background}
          direction={direction}
          reverse={reverse}
          {...rest}
        />
      );
    } else if (type === 'circle' || type === 'pie' || type === 'semicircle') {
      content = (
        <Circle
          aria-label={meterAriaLabel}
          ref={ref}
          max={memoizedMax}
          values={values}
          size={size}
          thickness={thickness}
          type={type}
          background={background}
          reverse={reverse}
          {...rest}
        />
      );
    }
    return content;
  },
);

Meter.displayName = 'Meter';
Meter.prototype = MeterPropTypes;

export { Meter };
