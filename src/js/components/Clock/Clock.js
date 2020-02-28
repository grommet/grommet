import React, { Component } from 'react';

import { Analog } from './Analog';
import { Digital } from './Digital';

const TIME_REGEXP = /T([0-9]{2}):([0-9]{2})(?::([0-9.,]{2,}))?/;
const DURATION_REGEXP = /^(-|\+)?P.*T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?$/;

const parseTime = (time, hourLimit) => {
  const result = {};
  if (time) {
    let match = DURATION_REGEXP.exec(time);
    if (match) {
      result.hours = parseFloat(match[2]);
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

class Clock extends Component {
  static defaultProps = {
    hourLimit: 24,
    precision: 'seconds',
    run: 'forward',
    size: 'medium',
    type: 'analog',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { hourLimit, time } = nextProps;
    const { elements } = prevState;
    if (!elements || time) {
      const nextElements = parseTime(time, hourLimit);
      if (!elements) {
        return { elements: nextElements };
      }
      if (
        Object.keys(nextElements).some(k => elements[k] !== nextElements[k])
      ) {
        return { elements: nextElements };
      }
    }
    return null;
  }

  state = {};

  componentDidMount() {
    const { run } = this.props;
    if (run) {
      this.run();
    }
  }

  componentDidUpdate(prevProps) {
    const { run } = this.props;
    if (run && !prevProps.run) {
      this.run();
    } else if (!run && prevProps.run) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  run() {
    const { hourLimit, onChange, precision, run } = this.props;
    const { elements } = this.state;

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

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { elements: previousElements } = this.state;
      const nextElements = { ...previousElements };

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

      this.setState({ elements: nextElements }, () => {
        if (onChange) {
          const { elements: e2 } = this.state;
          if (elements.duration) {
            onChange(`P${e2.hours}H${e2.minutes}M${e2.seconds}S`);
          } else {
            onChange(`T${e2.hours}:${e2.minutes}:${e2.seconds}`);
          }
        }
      });
    }, interval);
  }

  render() {
    const { type, ...rest } = this.props;
    const { elements } = this.state;
    let content;
    if (type === 'analog') {
      content = <Analog elements={elements} {...rest} />;
    } else if (type === 'digital') {
      content = <Digital elements={elements} {...rest} />;
    }

    return content;
  }
}

let ClockDoc;
if (process.env.NODE_ENV !== 'production') {
  ClockDoc = require('./doc').doc(Clock); // eslint-disable-line global-require
}
const ClockWrapper = ClockDoc || Clock;

export { ClockWrapper as Clock };
