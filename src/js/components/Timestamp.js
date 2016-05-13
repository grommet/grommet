// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { getCurrentLocale } from '../utils/Locale';

const CLASS_ROOT = 'timestamp';

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

  constructor () {
    super();
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
    const value = (typeof props.value === 'string') ? new Date(props.value) : props.value;

    let date;
    if (_showField('date', props.fields)) {
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      date = value.toLocaleDateString(locale, dateOptions);
    }

    let time;
    if (_showField('time', props.fields)) {
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      time = value.toLocaleTimeString(locale, timeOptions);
    }

    this.setState({ date: date, time: time });
  }

  render () {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + '--' + this.props.align);
    if (this.props.className) {
      classes.push(this.props.className);
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
  align: PropTypes.oneOf(['left', 'right']),
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
  align: 'left'
};
