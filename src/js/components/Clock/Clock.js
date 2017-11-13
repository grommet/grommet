import 'date-time-format-timezone';

import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledClock, { StyledCircle, StyledHour, StyledMinute, StyledSecond } from './StyledClock';
import doc from './doc';

const CLOCK_SIZE = 72;
const HALF_SIZE = CLOCK_SIZE / 2;
// this will serve both minutes and hours (360 / 6)
const ANGLE_UNIT = 6;
// 360 / 12
const HOUR_ANGLE_UNIT = 30;
// TODO: this is not flexible since we would need to change svg radius
const STROKE_WIDTH = 2;

// sizes for the hands
const SECOND_HAND_SIZE = CLOCK_SIZE / 8; // 9px
const MINUTE_HAND_SIZE = CLOCK_SIZE / 6; // 12px
const HOUR_HAND_SIZE = CLOCK_SIZE / 3; // 24px

// night variables
const NIGHT_START = 18;
const NIGHT_FINISH = 6;

const getTimezoneTime = (date, timezone) => (
  {
    hour: parseInt(
      new Intl.DateTimeFormat('en', {
        timeZone: timezone, hour: 'numeric', hour12: false,
      }).format(date), 10
    ),
    minute: parseInt(
      new Intl.DateTimeFormat('en', {
        timeZone: timezone, minute: 'numeric',
      }).format(date), 10
    ),
    second: parseInt(
      new Intl.DateTimeFormat('en', {
        timeZone: timezone, second: 'numeric',
      }).format(date), 10
    ),
  }
);

const getClockState = (props) => {
  const date = props.date || new Date();

  const { hour, minute, second } = getTimezoneTime(date, props.timezone);

  const hour12 = hour > 12 ? hour - 12 : hour;

  const minuteAngle = minute * ANGLE_UNIT;

  return {
    inSync: false,
    resetClock: true,
    date,
    // offset hour angle by half of the minute angle so that it gets closer to the next hour
    hourAngle: (hour12 * HOUR_ANGLE_UNIT) + (minute / 2),
    minuteAngle,
    secondAngle: second * ANGLE_UNIT,
    night: (
      props.night !== undefined ? (
        props.night
       ) : (
        hour >= NIGHT_START || hour < NIGHT_FINISH
       )
    ),
  };
};

class Clock extends Component {
  static defaultProps = {
    size: 'medium',
    timezone: 'America/Los_Angeles',
  }

  constructor(props, context) {
    super(props, context);
    this.state = getClockState(props);
  }

  componentDidMount() {
    this.placeClock();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date || this.props.timezone !== nextProps.timezone) {
      this.setState(getClockState(nextProps));
    }
  }

  componentDidUpdate() {
    const { resetClock } = this.state;
    if (resetClock) {
      if (this.remainingSecondsTimeout) {
        clearTimeout(this.remainingSecondsTimeout);
      }
      if (this.secondGapInterval) {
        clearInterval(this.secondGapInterval);
      }
      this.placeClock();
    }
  }

  componentWillUnmount() {
    if (this.remainingSecondsTimeout) {
      clearTimeout(this.remainingSecondsTimeout);
    }
    if (this.secondGapInterval) {
      clearInterval(this.secondGapInterval);
    }
  }

  placeClock = () => {
    const { timezone } = this.props;
    const { date, night, inSync } = this.state;

    if (!inSync) {
      const timezoneTime = getTimezoneTime(date, timezone);
      const second = timezoneTime.second;
      const minute = timezoneTime.second;
      let hour = timezoneTime.hour;
      // get the remaining seconds an notify the component to start animation only
      // after the clock finished the loop
      // for example: 04:40:30 pm will start the CSS animation at 04:41:00 pm
      const remainingSeconds = 60 - second;
      const remainingMinutes = 60 - minute;
      this.remainingSecondsTimeout = setTimeout(() => {
        clearInterval(this.secondGapInterval);
        const hour12 = hour > 12 ? hour - 12 : hour;

        let nextHourAngle = this.state.hourAngle;
        if (remainingMinutes === 1) {
          hour += 1;
          nextHourAngle = (hour12 * HOUR_ANGLE_UNIT) + HOUR_ANGLE_UNIT;
        }
        if (nextHourAngle === 360) {
          nextHourAngle = 0;
        }
        let nextMinuteAngle = this.state.minuteAngle;
        if (remainingSeconds > 0) {
          nextMinuteAngle = this.state.minuteAngle + ANGLE_UNIT;
        }
        if (nextMinuteAngle === 360) {
          nextMinuteAngle = 0;
        }

        this.setState({
          inSync: true,
          hourAngle: nextHourAngle,
          minuteAngle: nextMinuteAngle,
          secondAngle: 0,
          night: night !== undefined ? night : hour >= NIGHT_START || hour < NIGHT_FINISH,
        });
      }, (remainingSeconds * 1000));

      // animate in react while the clock is not in sync
      this.secondGapInterval = setInterval(() => {
        this.setState({ resetClock: false, secondAngle: this.state.secondAngle + ANGLE_UNIT });
      }, 1000);
    }
  }

  render() {
    const { seconds, theme } = this.props;
    const { inSync, hourAngle, minuteAngle, night, secondAngle } = this.state;

    let secondLine;
    if (seconds) {
      secondLine = (
        <StyledSecond
          animate={inSync}
          night={night}
          theme={theme}
          x1={HALF_SIZE}
          y1={HALF_SIZE}
          x2={HALF_SIZE}
          y2={SECOND_HAND_SIZE}
          stroke='#000000'
          strokeLinecap='round'
          style={{
            transform: `rotate(${secondAngle}deg)`,
            transformOrigin: `${HALF_SIZE}px ${HALF_SIZE}px`,
          }}
        />
      );
    }

    return (
      <StyledClock
        night={night}
        version='1.1'
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        preserveAspectRatio='xMidYMid meet'
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        {...this.props}
      >
        <StyledCircle
          night={night}
          theme={theme}
          fill='none'
          stroke='#000000'
          cx={HALF_SIZE}
          cy={HALF_SIZE}
          r={HALF_SIZE - STROKE_WIDTH}
        />
        {secondLine}
        <StyledMinute
          animate={inSync}
          night={night}
          theme={theme}
          x1={HALF_SIZE}
          y1={HALF_SIZE}
          x2={HALF_SIZE}
          y2={MINUTE_HAND_SIZE}
          stroke='#000000'
          strokeLinecap='round'
          style={{
            transform: `rotate(${minuteAngle}deg)`,
            transformOrigin: `${HALF_SIZE}px ${HALF_SIZE}px`,
          }}
        />
        <StyledHour
          animate={inSync}
          night={night}
          theme={theme}
          x1={HALF_SIZE}
          y1={HALF_SIZE}
          x2={HALF_SIZE}
          y2={HOUR_HAND_SIZE}
          stroke='#000000'
          strokeLinecap='round'
          style={{
            transform: `rotate(${hourAngle}deg)`,
            transformOrigin: `${HALF_SIZE}px ${HALF_SIZE}px`,
          }}
        />
      </StyledClock>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Clock);
}

export default compose(
  withTheme,
)(Clock);
