import React, { Component } from 'react';

import { Box } from '../Box';

import {
  StyledDigitalDigit,
  StyledDigitalNext,
  StyledDigitalPrevious,
} from './StyledClock';

class Digit extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { number } = nextProps;
    if (number !== prevState.number) {
      return { previous: prevState.number, number };
    }
    return null;
  }

  state = {};

  componentDidUpdate(prevProps, prevState) {
    const { previous } = this.state;
    if (prevState.previous === undefined && previous !== undefined) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ previous: undefined });
      }, 900);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    /* eslint-disable-next-line react/prop-types */
    const { run, size } = this.props;
    const { number, previous } = this.state;
    if (previous !== undefined) {
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
  }
}

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

export const Digital = props => {
  const { elements, precision, run, size, ...rest } = props;
  delete rest.hourLimit;
  delete rest.time;
  let seconds;
  if (precision === 'seconds') {
    seconds = <Element number={elements.seconds} run={run} size={size} sep />;
  }
  let minutes;
  if (precision === 'minutes' || precision === 'seconds') {
    minutes = <Element number={elements.minutes} run={run} size={size} sep />;
  }
  return (
    <Box direction="row" {...rest}>
      <Element
        number={elements.hours12 || elements.hours}
        run={run}
        size={size}
      />
      {minutes}
      {seconds}
    </Box>
  );
};
