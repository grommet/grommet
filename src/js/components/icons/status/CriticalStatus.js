// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class CriticalStatus extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-critical`,
      className
    );
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        version='1.1' aria-label={a11yTitle}>
        <g className={`${CLASS_ROOT}__base`} stroke='none'>
          <path d='M12,0 L24,12 L12,24 L0,12 Z' />
        </g>
        <g className={`${CLASS_ROOT}__detail`} fill='none'>
          <path d='M8,8 L16,16' strokeWidth='2' />
          <path d='M8,16 L16,8' strokeWidth='2' />
        </g>
      </svg>
    );
  }
}

CriticalStatus.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string
};

CriticalStatus.defaultProps = {
  a11yTitle: 'Critical'
};
