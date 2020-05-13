import React, { forwardRef, useEffect, useState } from 'react';

import { Box } from '../Box';

import {
  StyledDigitalDigit,
  StyledDigitalNext,
  StyledDigitalPrevious,
} from './StyledClock';

const Digit = ({ number, run, size }) => {
  const [previous, setPrevious] = useState(number);
  const [changing, setChanging] = useState();

  useEffect(() => {
    if (number !== previous) {
      setChanging(true);
      const timer = setTimeout(() => {
        setPrevious(number);
        setChanging(false);
      }, 900);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [number, previous]);

  if (changing) {
    const direction = run === 'backward' ? 'down' : 'up';
    return (
      <StyledDigitalDigit size={size}>
        <StyledDigitalPrevious direction={direction}>
          {Math.floor(previous)}
        </StyledDigitalPrevious>
        <StyledDigitalNext direction={direction}>
          {Math.floor(number)}
        </StyledDigitalNext>
      </StyledDigitalDigit>
    );
  }
  return (
    <StyledDigitalDigit size={size}>{Math.floor(number)}</StyledDigitalDigit>
  );
};

const Element = ({ number, run, sep, size }) => {
  const tens = Math.floor(number / 10);
  const ones = number % 10;
  const result = [
    <Digit key="tens" run={run} size={size} number={tens} />,
    <Digit key="ones" run={run} size={size} number={ones} />,
  ];
  if (sep) {
    result.unshift(
      <StyledDigitalDigit key="sep" size={size}>
        :
      </StyledDigitalDigit>,
    );
  }
  return result;
};

export const Digital = forwardRef((props, ref) => {
  const { elements, precision, run, size, ...rest } = props;
  let seconds;
  if (precision === 'seconds') {
    seconds = <Element number={elements.seconds} run={run} size={size} sep />;
  }
  let minutes;
  if (precision === 'minutes' || precision === 'seconds') {
    minutes = <Element number={elements.minutes} run={run} size={size} sep />;
  }
  return (
    <Box ref={ref} direction="row" {...rest}>
      <Element
        number={elements.hours12 || elements.hours}
        run={run}
        size={size}
      />
      {minutes}
      {seconds}
    </Box>
  );
});
