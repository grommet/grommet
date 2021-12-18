import React, { forwardRef, useEffect, useState } from 'react';

import { Analog } from './Analog';
import { Digital } from './Digital';
import { ClockPropTypes } from './propTypes';

const TIME_REGEXP = /T([0-9]{2}):([0-9]{2})(?::([0-9.,]{2,}))?/;
const DURATION_REGEXP =
  /^(-|\+)?P.*T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?$/;

const parseTime = (time, hourLimit) => {
  const result = {};
  if (time) {
    let match = DURATION_REGEXP.exec(time);
    if (match) {
      result.hours = parseFloat(match[2]) || 0;
      if (hourLimit === 12) {
        result.hours12 = result.hours > 12 ? result.hours - 12 : result.hours;
      }
      result.minutes = parseFloat(match[3]) || 0;
      result.seconds = parseFloat(match[4]) || 0;
      result.duration = true;
    } else {
      match = TIME_REGEXP.exec(time);
      if (match) {
        result.hours = parseFloat(match[1]);
        if (hourLimit === 12) {
          result.hours12 = result.hours > 12 ? result.hours - 12 : result.hours;
        }
        result.minutes = parseFloat(match[2]) || 0;
        result.seconds = parseFloat(match[3]) || 0;
      } else {
        console.error(`Grommet Clock cannot parse '${time}'`);
      }
    }
  } else {
    const date = new Date();
    result.hours = date.getHours();
    result.minutes = date.getMinutes();
    result.seconds = date.getSeconds();
  }
  return result;
};

const Clock = forwardRef(
  (
    {
      hourLimit = 24,
      onChange,
      precision = 'seconds',
      run = 'forward',
      size = 'medium',
      time,
      type = 'analog',
      ...rest
    },
    ref,
  ) => {
    const [elements, setElements] = useState(parseTime(time, hourLimit));
    useEffect(() => setElements(parseTime(time, hourLimit)), [hourLimit, time]);

    useEffect(() => {
      const atDurationEnd =
        run === 'backward' &&
        elements.duration &&
        !elements.hours &&
        !elements.minutes &&
        !elements.seconds;

      if (run && !atDurationEnd) {
        // set the interval time based on the precision
        let interval = 1000;
        let increment = 'seconds';
        if (precision !== 'seconds' && elements.seconds === 0) {
          interval *= 60;
          increment = 'minutes';
          if (precision !== 'minutes' && elements.minutes === 0) {
            interval *= 60;
            increment = 'hours';
          }
        }

        const timer = setInterval(() => {
          const nextElements = { ...elements };
          // adjust time based on precision
          if (increment === 'seconds') {
            if (run === 'backward') {
              nextElements.seconds -= 1;
            } else {
              nextElements.seconds += 1;
            }
          } else if (increment === 'minutes') {
            if (run === 'backward') {
              nextElements.minutes -= 1;
            } else {
              nextElements.minutes += 1;
            }
          } else if (increment === 'hours') {
            if (run === 'backward') {
              nextElements.hours -= 1;
            } else {
              nextElements.hours += 1;
            }
          }

          // deal with overflows
          if (nextElements.seconds >= 60) {
            nextElements.minutes += Math.floor(nextElements.seconds / 60);
            nextElements.seconds = 0;
          } else if (nextElements.seconds < 0) {
            nextElements.minutes += Math.floor(nextElements.seconds / 60);
            nextElements.seconds = 59;
          }
          if (nextElements.minutes >= 60) {
            nextElements.hours += Math.floor(nextElements.minutes / 60);
            nextElements.minutes = 0;
          } else if (nextElements.minutes < 0) {
            nextElements.hours += Math.floor(nextElements.minutes / 60);
            nextElements.minutes = 59;
          }
          if (nextElements.hours >= 24 || nextElements.hours < 0) {
            nextElements.hours = 0;
          }
          if (hourLimit === 12) {
            nextElements.hours12 =
              nextElements.hours > 12
                ? nextElements.hours - 12
                : nextElements.hours;
          }

          setElements(nextElements);

          if (onChange) {
            const e = nextElements;
            if (e.duration) {
              onChange(`P${e.hours}H${e.minutes}M${e.seconds}S`);
            } else {
              onChange(`T${e.hours}:${e.minutes}:${e.seconds}`);
            }
          }
        }, interval);

        return () => clearInterval(timer);
      }

      return undefined;
    }, [elements, hourLimit, onChange, precision, run]);

    let content;
    if (type === 'analog') {
      content = (
        <Analog
          ref={ref}
          elements={elements}
          precision={precision}
          size={size}
          {...rest}
        />
      );
    } else if (type === 'digital') {
      content = (
        <Digital
          ref={ref}
          elements={elements}
          precision={precision}
          run={run}
          size={size}
          {...rest}
        />
      );
    }

    return content;
  },
);

Clock.displayName = 'Clock';
Clock.propTypes = ClockPropTypes;

export { Clock };
