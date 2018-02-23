import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import Analog from './Analog';
import Digital from './Digital';
import doc from './doc';

const TIME_REGEXP = /^T([0-9]{2}):([0-9]{2}):([0-9.,]*)$/;
const DURATION_REGEXP =
  /^(-|\+)?P.*T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?$/;

const parseTime = (time, hourLimit) => {
  const normalizedTime = time || (new Date()).toISOString();
  const result = {};
  let match = DURATION_REGEXP.exec(normalizedTime);
  if (match) {
    result.hours = parseFloat(match[2]);
    if (hourLimit === 12) {
      result.hours = (result.hours > 12 ? (result.hours - 12) : result.hours);
    }
    result.minutes = parseFloat(match[3]);
    result.seconds = parseFloat(match[4]);
    result.duration = true;
  } else {
    match = TIME_REGEXP.exec(normalizedTime);
    if (match) {
      result.hours = parseFloat(match[1]);
      result.minutes = parseFloat(match[2]);
      result.seconds = parseFloat(match[3]);
    } else {
      const date = new Date(normalizedTime);
      result.hours = date.getHours();
      result.minutes = date.getMinutes();
      result.seconds = date.getSeconds();
    }
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
  }

  constructor(props) {
    super(props);
    this.state = { elements: parseTime(props.time, props.hourLimit) };
  }

  componentDidMount() {
    if (this.props.run) {
      this.run();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.run) {
      this.run();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  run() {
    const { hourLimit, onChange, precision, run } = this.props;

    // set the interval time based on the precision
    let interval = 1000;
    let increment = 'seconds';
    if (precision !== 'seconds' && this.state.elements.seconds === 0) {
      interval *= 60;
      increment = 'minutes';
      if (precision !== 'minutes' && this.state.elements.minutes === 0) {
        interval *= 60;
        increment = 'hours';
      }
    }

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { elements } = this.state;
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
      if (nextElements.hours >= hourLimit || nextElements.hours < 0) {
        nextElements.hours = 0;
      }

      this.setState({ elements: nextElements }, () => {
        if (onChange) {
          if (elements.duration) {
            onChange(`P${elements.hours}H${elements.minutes}M${elements.seconds}S`);
          } else {
            onChange(`T${elements.hours}:${elements.minutes}:${elements.seconds}`);
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

if (process.env.NODE_ENV !== 'production') {
  doc(Clock);
}

export default compose(
  withTheme,
)(Clock);
