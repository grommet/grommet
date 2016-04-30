// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { getCurrentLocale } from '../utils/Locale';

const CLASS_ROOT = 'timestamp';

export default class Timestamp extends Component {

  render () {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + '--' + this.props.align);
    if (this.props.className) {
      classes.push(this.props.className);
    }
    let locale = getCurrentLocale();
    let value = typeof this.props.value === 'string' ?
      new Date(this.props.value) : this.props.value;
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = value.toLocaleDateString(locale, dateOptions);
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const time = value.toLocaleTimeString(locale, timeOptions);
    return (
      <span className={classes.join(' ')}>
        <span className={`${CLASS_ROOT}__date`}>{date}
        </span> <span className={`${CLASS_ROOT}__time`}>{time}</span>
      </span>
    );
  }

}

Timestamp.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
};

Timestamp.defaultProps = {
  align: 'left'
};
