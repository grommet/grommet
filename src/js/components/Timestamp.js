// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
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
    this.state = {};
  }

  componentDidMount () {
    this._formatForLocale(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this._formatForLocale(nextProps);
  }

  _formatForLocale (props) {
    const locale = getCurrentLocale();
    const value =
      (typeof props.value === 'string') ? new Date(props.value) : props.value;

    let date;
    if (_showField('date', props.fields)) {
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      date = value.toLocaleDateString(locale, dateOptions);
    }

    let time;
    if (_showField('time', props.fields)) {
      const timeOptions = (props.seconds)
        ? { hour: '2-digit', minute: '2-digit', second: '2-digit' }
        : { hour: '2-digit', minute: '2-digit' };

      time = value.toLocaleTimeString(locale, timeOptions);
    }

    this.setState({ date: date, time: time });
  }

  render () {
    const { align, className } = this.props;
    var classes = [CLASS_ROOT];
    if (align) {
      classes.push(CLASS_ROOT + '--' + align);
    }
    if (className) {
      classes.push(className);
    }

    let date;
    if (this.state.date) {
      date = <span className={`${CLASS_ROOT}__date`}>{this.state.date}</span>;
    }

    let time;
    if (this.state.time) {
      time = <span className={`${CLASS_ROOT}__time`}>{this.state.time}</span>;
    }

    return (
      <span className={classes.join(' ')}>
        {date} {time}
      </span>
    );
  }

}

const FIELD_TYPES = PropTypes.oneOf(['date', 'time']);

Timestamp.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  fields: PropTypes.oneOfType([
    PropTypes.arrayOf(FIELD_TYPES),
    FIELD_TYPES
  ]),
  seconds: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string, // ISO-8601 string
    PropTypes.object  // Date object
  ]).isRequired
};
