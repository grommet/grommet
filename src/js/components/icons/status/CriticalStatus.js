// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

let _lastId = 0;

export default class CriticalStatus extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-critical`,
      className
    );
    // generate an id to avoid duplication in the DOM
    const maskId = `mask-critical-${_lastId++}`;
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        version='1.1' aria-label={a11yTitle}>
        <defs>
          <mask id={maskId}>
            <g className={`${CLASS_ROOT}__detail`} >
              <rect x='0' y='0' width='24' height='24' fill='#fff' />
              <path d='M8,8 L16,16' strokeWidth='2' stroke='#000' fill='none' />
              <path d='M8,16 L16,8' strokeWidth='2' stroke='#000' fill='none' />
            </g>
          </mask>
        </defs>
        <g className={`${CLASS_ROOT}__base`} mask={`url(#${maskId})`}>
          <path d='M12,0 L24,12 L12,24 L0,12 Z' stroke='none' />
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
