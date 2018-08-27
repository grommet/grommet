import React, { Component } from 'react';

import { parseMetricToNum } from '../../utils';

import { StyledAnalog, StyledHour, StyledMinute, StyledSecond } from './StyledClock';

// this will serve both minutes and hours (360 / 6)
const ANGLE_UNIT = 6;
// 360 / 12
const HOUR_ANGLE_UNIT = 30;

const getClockDimensions = theme => (
  {
    size: parseMetricToNum(theme.clock.analog.size.medium),
    secondSize: parseMetricToNum(theme.clock.analog.second.size),
    minuteSize: parseMetricToNum(theme.clock.analog.minute.size),
    hourSize: parseMetricToNum(theme.clock.analog.hour.size),
  }
);

const getClockState = ({ hours, minutes, seconds }) => {
  const hour12 = hours > 12 ? hours - 12 : hours;
  const minuteAngle = minutes * ANGLE_UNIT;

  return {
    // offset hour angle by half of the minute angle so that it gets closer to the next hour
    hourAngle: (hour12 * HOUR_ANGLE_UNIT) + (minutes / 2),
    minuteAngle,
    secondAngle: seconds * ANGLE_UNIT,
  };
};

export class Analog extends Component {
  static defaultProps = {
    size: 'medium',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { elements } = nextProps;
    const nextState = getClockState(elements);
    if (prevState.hourAngle === undefined ||
      Object.keys(nextState).some(k => prevState[k] !== nextState[k])) {
      return nextState;
    }
    return null;
  }

  state = {}

  render() {
    const { precision, theme, ...rest } = this.props;
    const { hourAngle, minuteAngle, secondAngle } = this.state;
    const { size, secondSize, minuteSize, hourSize } = getClockDimensions(theme);
    const halfSize = size / 2;

    let secondHand;
    if (precision === 'seconds') {
      secondHand = (
        <StyledSecond
          theme={theme}
          x1={halfSize}
          y1={halfSize}
          x2={halfSize}
          y2={secondSize}
          stroke='#000000'
          strokeLinecap={theme.clock.analog.second.shape}
          style={{
            transform: `rotate(${secondAngle}deg)`,
            transformOrigin: `${halfSize}px ${halfSize}px`,
          }}
        />
      );
    }

    let minuteHand;
    if (precision === 'seconds' || precision === 'minutes') {
      minuteHand = (
        <StyledMinute
          theme={theme}
          x1={halfSize}
          y1={halfSize}
          x2={halfSize}
          y2={minuteSize}
          stroke='#000000'
          strokeLinecap={theme.clock.analog.minute.shape}
          style={{
            transform: `rotate(${minuteAngle}deg)`,
            transformOrigin: `${halfSize}px ${halfSize}px`,
          }}
        />
      );
    }

    return (
      <StyledAnalog
        version='1.1'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox={`0 0 ${size} ${size}`}
        theme={theme}
        {...rest}
      >
        {secondHand}
        {minuteHand}
        <StyledHour
          theme={theme}
          x1={halfSize}
          y1={halfSize}
          x2={halfSize}
          y2={hourSize}
          stroke='#000000'
          strokeLinecap={theme.clock.analog.hour.shape}
          style={{
            transform: `rotate(${hourAngle}deg)`,
            transformOrigin: `${halfSize}px ${halfSize}px`,
          }}
        />
      </StyledAnalog>
    );
  }
}
