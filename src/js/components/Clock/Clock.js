import React, { useEffect, useState } from 'react';

import { Analog } from './Analog';
import { Digital } from './Digital';

const TIME_REGEXP = /T([0-9]{2}):([0-9]{2})(?::([0-9.,]{2,}))?/;
const DURATION_REGEXP = /^(-|\+)?P.*T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?$/;

const parseTime = (time, hourLimit) => {
  const result = {};
  if (time) {
    let match = DURATION_REGEXP.exec(time);
    if (match) {
      result.duration = true;

      result.hours = parseFloat(match[2]);
      result.minutes = parseFloat(match[3]) || 0;
      result.seconds = parseFloat(match[4]) || 0;

      if (hourLimit === 12) {
        result.hours12 = result.hours > 12 ? result.hours - 12 : result.hours;
      }
    } else {
      match = TIME_REGEXP.exec(time);
      if (match) {
        result.hours = parseFloat(match[1]);
        result.minutes = parseFloat(match[2]) || 0;
        result.seconds = parseFloat(match[3]) || 0;

        if (hourLimit === 12) {
          result.hours12 = result.hours > 12 ? result.hours - 12 : result.hours;
        }
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

const handleOverflows = (elements, hourLimit) => {
  const nextElements = { ...elements };
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
      nextElements.hours > 12 ? nextElements.hours - 12 : nextElements.hours;
  }
  return nextElements;
};

const getIncrementandInterval = (precision, elements) => {
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
  return { interval, increment };
};

const adjustTimeBasedOnPrecision = (increment, run, elements) => {
  const nextElements = { ...elements };
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
  return nextElements;
};
const Clock = props => {
  const { hourLimit, time, run, precision, onChange } = props;

  const [elements, setElements] = useState(parseTime(time, hourLimit));

  if (onChange) {
    const { hours, minutes, seconds } = elements;
    if (elements.duration) {
      onChange(`P${hours}H${minutes}M${seconds}S`);
    } else {
      onChange(`T${hours}:${minutes}:${seconds}`);
    }
  }

  const { increment, interval } = getIncrementandInterval(precision, elements);

  useEffect(() => {
    if (run) {
      const timer = setInterval(() => {
        setElements(prevElements => {
          let nextElements = { ...prevElements };
          nextElements = adjustTimeBasedOnPrecision(
            increment,
            run,
            nextElements,
          );
          nextElements = handleOverflows(nextElements, hourLimit);
          return nextElements;
        });
      }, interval);

      return () => {
        clearInterval(timer);
      };
    }
    return () => {};
  }, [hourLimit, increment, interval, run]);

  let content;
  const { type, ...rest } = props;
  if (type === 'analog') {
    content = <Analog elements={elements} {...rest} />;
  } else if (type === 'digital') {
    content = <Digital elements={elements} {...rest} />;
  }

  return content;
};

Clock.defaultProps = {
  hourLimit: 24,
  precision: 'seconds',
  run: 'forward',
  size: 'medium',
  type: 'analog',
};

Clock.displayName = 'Clock';

let ClockDoc;
if (process.env.NODE_ENV !== 'production') {
  ClockDoc = require('./doc').doc(Clock); // eslint-disable-line global-require
}
const ClockWrapper = ClockDoc || Clock;

export { ClockWrapper as Clock };
