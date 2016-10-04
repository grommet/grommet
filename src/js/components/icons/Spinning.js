// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SPINNING;

export default class Spinning extends Component {
  render () {
    const { className, small, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--small`]: small
      },
      className
    );

    return (
      <svg {...props} className={classes} viewBox="0 0 48 48" version="1.1"
        role="img">
        <title>Spinning</title>
        <circle stroke="#ddd" strokeWidth="4" strokeDasharray="24px 8px"
          fill="none" cx="24" cy="24" r="20" />
        <circle stroke="#333" strokeWidth="4" strokeDasharray="24px 104px"
          fill="none" cx="24" cy="24" r="20" />
      </svg>
    );
  }
}

Spinning.propTypes = {
  small: PropTypes.bool
};
