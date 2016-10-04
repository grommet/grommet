// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class Label extends Component {
  render() {
    const { className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-label`,
      className
    );
    return (
      <svg {...props} className={classes} viewBox="0 0 24 24" version="1.1">
        <g className={`${CLASS_ROOT}__base`}>
          <circle cx="12" cy="12" r="12" stroke="none" />
        </g>
      </svg>
    );
  }
}
