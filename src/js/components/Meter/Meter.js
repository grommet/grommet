import React, { forwardRef, useContext, useMemo } from 'react';

import { Bar } from './Bar';
import { Circle } from './Circle';
import { MeterPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

const Meter = forwardRef(
  (
    {
      'aria-label': ariaLabel,
      background = { color: 'light-2', opacity: 'medium' },
      color,
      direction = 'horizontal',
      max: maxProp,
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

    const max = useMemo(() => {
      let maxValue = 100;
      if (values?.length > 1) {
        maxValue = values.reduce(
          (total, currentValue) => total + currentValue.value,
          0,
        );
      }
      return maxProp || maxValue || 100;
    }, [maxProp, values]);

    const messageId = values?.length === 1 ? 'singular' : 'plural';

    const meterType = type || 'bar';

    const meterAriaLabel =
      ariaLabel ||
      format({
        id: `meter.${meterType}.${messageId}`,
        messages: messages?.meter?.[meterType],
        values: {
          meterValue:
            value || values.map((item) => item.value ?? 0).join(', ') || 0,
          type,
          max,
        },
      });

    let content;
    if (type === 'bar') {
      content = (
        <Bar
          ref={ref}
          aria-label={meterAriaLabel}
          max={max}
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
          max={max}
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
