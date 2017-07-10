// (C) Copyright 2014-2017 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import { getCurrentLocale } from '../utils/Locale';

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
    const dateObj = moment(value).locale(locale);

    let dateFormat;
    let yearFormat;
    let monthFormat;
    let dayFormat;

    let timeFormat;
    let hourFormat;
    let minuteFormat;
    let secondFormat;

    if (_showField('date', fields)) {
      dateFormat = 'll';
    }

    if (!dateFormat) {
      if (_showField('year', fields)) {
        yearFormat = 'YYYY';
      }

      if (_showField('month', fields)) {
        monthFormat = 'MMM';
      } else if (_showField('month-full', fields)) {
        monthFormat = 'MMMM';
      }

      if (_showField('day', fields)) {
        dayFormat = 'D';
      }
    } else if (_showField('month-full', fields)) {
      dateFormat = 'LL';
    }

    if (_showField('time', fields)) {
      timeFormat = 'LT';
    } 

    if (!timeFormat) {
      if (_showField('hour', fields) || _showField('hours', fields)) {
        hourFormat = 'hh';
      }
      if (_showField('minute', fields) || _showField('minutes', fields)) {
        minuteFormat = (hourFormat ? ':' : '') + 'mm';
      }
      if (_showField('second', fields) || _showField('seconds', fields)) {
        secondFormat = (minuteFormat ? ':' : '') + 'ss';
      }
    } else if (_showField('second', fields) || _showField('seconds', fields)) {
      timeFormat = 'LTS';
    }

    if (!dateFormat) {
      dateFormat = (
        `${monthFormat || ''} ${dayFormat || ''} ${yearFormat || ''}`
      );
    }

    if (!timeFormat) {
      timeFormat = (
        `${hourFormat || ''}${minuteFormat || ''}${secondFormat || ''}`
      );
    }

    const date = dateFormat !== '  ' ? dateObj.format(dateFormat) : undefined;
    const time = timeFormat !== '' ? dateObj.format(timeFormat) : undefined;

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
  'date', 'time', 'year', 'month', 'month-full', 'day',
  'hour', 'minute', 'second',
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
