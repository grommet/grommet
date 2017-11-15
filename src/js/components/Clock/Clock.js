import 'date-time-format-timezone';

import React, { Component } from 'react';
import { compose } from 'recompose';

import { parseMetricToInt } from '../../utils';

import { withTheme } from '../hocs';

import StyledClock, { StyledCircle, StyledHour, StyledMinute, StyledSecond } from './StyledClock';
import doc from './doc';

// this will serve both minutes and hours (360 / 6)
const ANGLE_UNIT = 6;
// 360 / 12
const HOUR_ANGLE_UNIT = 30;
// night variables
const NIGHT_START = 18;
const NIGHT_FINISH = 6;

const getClockDimensions = theme => (
  {
    size: parseMetricToInt(theme.clock.size.medium),
    secondSize: parseMetricToInt(theme.clock.second.size),
    minuteSize: parseMetricToInt(theme.clock.minute.size),
    hourSize: parseMetricToInt(theme.clock.hour.size),
    stroke: parseMetricToInt(theme.clock.circle.width),
  }
);

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
    this.placeClockHands();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date || this.props.timezone !== nextProps.timezone) {
      this.setState(getClockState(nextProps));
    }
  }

  componentDidUpdate() {
    const { resetClock } = this.state;
    if (resetClock) {
      if (this.syncClockTimeout) {
        clearTimeout(this.syncClockTimeout);
      }
      if (this.secondsAnimation) {
        clearInterval(this.secondsAnimation);
      }
      this.placeClockHands();
    }
  }

  componentWillUnmount() {
    if (this.syncClockTimeout) {
      clearTimeout(this.syncClockTimeout);
    }
    if (this.secondsAnimation) {
      clearInterval(this.secondsAnimation);
    }
  }

  placeClockHands = () => {
    const { seconds, timezone } = this.props;
    const { date, night, inSync } = this.state;

    // if clock is not in sync we need to animate using JavaScript first and then
    // use CSS animation
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

      // timeout will be executed when clock is in sync
      this.syncClockTimeout = setTimeout(() => {
        clearInterval(this.secondsAnimation);
        const hour12 = hour > 12 ? hour - 12 : hour;

        let nextHourAngle = this.state.hourAngle;
        // sync hour
        if (remainingMinutes === 1) {
          hour += 1;
          nextHourAngle = (hour12 * HOUR_ANGLE_UNIT) + HOUR_ANGLE_UNIT;
        }
        if (nextHourAngle === 360) {
          nextHourAngle = 0;
        }

        // sync minute
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

      // only animate if we have seconds hand
      if (seconds) {
        // animate seconds in react while the clock is not in sync
        this.secondsAnimation = setInterval(() => {
          this.setState({ resetClock: false, secondAngle: this.state.secondAngle + ANGLE_UNIT });
        }, 1000);
      }
    }
  }

  render() {
    const { seconds, theme } = this.props;
    const { inSync, hourAngle, minuteAngle, night, secondAngle } = this.state;

    const { size, secondSize, minuteSize, hourSize, stroke } = getClockDimensions(theme);
    const halfSize = size / 2;

    let secondLine;
    if (seconds) {
      secondLine = (
        <StyledSecond
          animate={inSync}
          night={night}
          theme={theme}
          x1={halfSize}
          y1={halfSize}
          x2={halfSize}
          y2={secondSize}
          stroke='#000000'
          strokeLinecap={theme.clock.second.shape}
          style={{
            transform: `rotate(${secondAngle}deg)`,
            transformOrigin: `${halfSize}px ${halfSize}px`,
          }}
        />
      );
    }

    return (
      <StyledClock
        night={night}
        version='1.1'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox={`0 0 ${size} ${size}`}
        {...this.props}
      >
        <StyledCircle
          night={night}
          theme={theme}
          fill='none'
          stroke='#000000'
          cx={halfSize}
          cy={halfSize}
          r={halfSize - stroke}
        />
        {secondLine}
        <StyledMinute
          animate={inSync}
          night={night}
          theme={theme}
          x1={halfSize}
          y1={halfSize}
          x2={halfSize}
          y2={minuteSize}
          stroke='#000000'
          strokeLinecap={theme.clock.minute.shape}
          style={{
            transform: `rotate(${minuteAngle}deg)`,
            transformOrigin: `${halfSize}px ${halfSize}px`,
          }}
        />
        <StyledHour
          animate={inSync}
          night={night}
          theme={theme}
          x1={halfSize}
          y1={halfSize}
          x2={halfSize}
          y2={hourSize}
          stroke='#000000'
          strokeLinecap={theme.clock.hour.shape}
          style={{
            transform: `rotate(${hourAngle}deg)`,
            transformOrigin: `${halfSize}px ${halfSize}px`,
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
