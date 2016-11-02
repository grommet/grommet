// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getCurrentLocale } from '../utils/Locale';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TIMESTAMP;

const FORMATS = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};

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
    const dateObj = (typeof value === 'string') ? new Date(value) : value;
    let dateOptions = {};
    let timeOptions = {};

    if (_showField('date', fields)) {
      dateOptions.year = FORMATS.year;
      dateOptions.month = FORMATS.month;
      dateOptions.day = FORMATS.day;
    }
    if (_showField('year', fields)) {
      dateOptions.year = FORMATS.year;
    }
    if (_showField('month', fields)) {
      dateOptions.month = FORMATS.month;
    }
    if (_showField('day', fields)) {
      dateOptions.day = FORMATS.day;
    }

    if (_showField('time', fields)) {
      timeOptions.hour = FORMATS.hour;
      timeOptions.minute = FORMATS.minute;
    }
    if (_showField('hour', fields) || _showField('hours', fields)) {
      timeOptions.hour = FORMATS.hour;
    }
    if (_showField('minute', fields) || _showField('minutes', fields)) {
      timeOptions.minute = FORMATS.minute;
    }
    if (_showField('second', fields) || _showField('seconds', fields)) {
      timeOptions.second = FORMATS.second;
    }

    const date = Object.keys(dateOptions).length > 0 ?
      dateObj.toLocaleDateString(locale, dateOptions) : undefined;
    const time = Object.keys(timeOptions).length > 0 ?
      dateObj.toLocaleTimeString(locale, timeOptions) : undefined;

    this.setState({ date, time });
  }

  render () {
    const { align, className, ...props } = this.props;
    const { date, time } = this.state;
    delete props.fields;
    delete props.value;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${align}`]: align
      },
      className
    );


    let dateElement;
    if (date) {
      dateElement = <span className={`${CLASS_ROOT}__date`}>{date}</span>;
    }

    let timeElement;
    if (time) {
      timeElement = <span className={`${CLASS_ROOT}__time`}>{time}</span>;
    }

    return (
      <span {...props} className={classes}>
        {dateElement}
        {timeElement}
      </span>
    );
  }

}

const FIELD_TYPES = PropTypes.oneOf([
  'date', 'time', 'year', 'month', 'day', 'hour', 'minute', 'second',
  'hours', 'minutes', 'seconds' // deprecated
]);

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
