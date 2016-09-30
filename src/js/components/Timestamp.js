// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getCurrentLocale } from '../utils/Locale';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TIMESTAMP;

function _showField(field, fields) {
  let result = true;
  if (fields) {
    if (Array.isArray(fields)) {
      result = fields.indexOf(field) !== -1;
    } else {
      result = field === fields;
    }
  }
  return result;
}

export default class Timestamp extends Component {

  constructor(props, context) {
    super(props, context);
    this._formatForLocale = this._formatForLocale.bind(this);
    this.state = {};
  }

  componentDidMount () {
    this._formatForLocale(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this._formatForLocale(nextProps);
  }

  _formatForLocale ({value, fields}) {
    const locale = getCurrentLocale();
    const dateObj =
      (typeof value === 'string') ? new Date(value) : value;

    // Date only.
    let date;
    if (_showField('date', fields)) {
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      date = dateObj.toLocaleDateString(locale, dateOptions);
    }

    // Hours, Minutes, and Seconds. 
    // Time only.
    let time;
    if (_showField('time', fields)) {
      const timeOptions = (!_showField('seconds', fields))
        ? { hour: '2-digit', minute: '2-digit' }
        : { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      time = dateObj.toLocaleTimeString(locale, timeOptions);
    }

    // Hours only.
    let hours;
    if (_showField('hours', fields) && !_showField('minutes', fields) 
      && !_showField('time', fields)) {
      const timeOptions = { hour: '2-digit' };
      hours = dateObj.toLocaleTimeString(locale, timeOptions);
    }

    // Hours and Minutes.
    if (_showField('hours', fields) && _showField('minutes', fields)) {
      const timeOptions = (!_showField('seconds', fields))
        ? { hour: '2-digit', minute: '2-digit' }
        : { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      time = dateObj.toLocaleTimeString(locale, timeOptions);
    }

    // Minutes only.
    let minutes;
    if (_showField('minutes', fields) && !_showField('hours', fields) 
      &&!_showField('time', fields)) {
      const timeOptions = { minute: '2-digit' };
      minutes = dateObj.toLocaleTimeString(locale, timeOptions);
    }

    // Seconds only.
    let seconds;
    if (_showField('seconds', fields) && !_showField('time', fields)) {
      if (!_showField('hours', fields) || !_showField('minutes', fields)) {
        const timeOptions = { second: '2-digit' };
        // This avoids spacing issues when Seconds is used with 
        // Hours or Minutes.
        seconds = (Array.isArray(fields))
          ? ` ${dateObj.toLocaleTimeString(locale, timeOptions)}`
          : dateObj.toLocaleTimeString(locale, timeOptions);
      }
    }

    this.setState({ 
      date: date, 
      time: time, 
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  render () {
    const { align, className } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      { 
        [`${CLASS_ROOT}--${align}`]: align 
      },
      className
    );


    const date = (this.state.date) 
      ? <span className={`${CLASS_ROOT}__date`}>{this.state.date}</span>
      : null;

    const time = (this.state.time || this.state.hours || this.state.minutes
      || this.state.seconds) 
      ? <span className={`${CLASS_ROOT}__time`}>
          {this.state.time}
          {this.state.hours}
          {this.state.minutes}
          {this.state.seconds}
        </span>
      : null;

    return (
      <span className={classes}>
        {date} {time}
      </span>
    );
  }

}

const FIELD_TYPES = PropTypes.oneOf(['date', 'time', 'hours', 'minutes', 
  'seconds']);

Timestamp.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  fields: PropTypes.oneOfType([
    PropTypes.arrayOf(FIELD_TYPES),
    FIELD_TYPES
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string, // ISO-8601 string
    PropTypes.object  // Date object
  ]).isRequired
};

Timestamp.defaultProps = {
  fields: ["date", "time"]
};
