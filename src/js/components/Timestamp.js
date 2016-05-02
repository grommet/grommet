// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { getCurrentLocale } from '../utils/Locale';

const CLASS_ROOT = 'timestamp';

function showField(field, fields) {
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

  render () {
    const { fields } = this.props;
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + '--' + this.props.align);
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let locale = getCurrentLocale();
    let value = typeof this.props.value === 'string' ?
      new Date(this.props.value) : this.props.value;

    let date;
    if (showField('date', fields)) {
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      date = (
        <span className={`${CLASS_ROOT}__date`}>
          {value.toLocaleDateString(locale, dateOptions)}
        </span>
      );
    }

    let time;
    if (showField('time', fields)) {
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      time = (
        <span className={`${CLASS_ROOT}__time`}>
          {value.toLocaleTimeString(locale, timeOptions)}
        </span>
      );
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
    PropTypes.string,
    PropTypes.object
  ]).isRequired
};

Timestamp.defaultProps = {
  align: 'left'
};
