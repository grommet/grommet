// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

let _lastId = 0;

export default class Disabled extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-disabled`,
      className
    );
    // generate an id to avoid duplication in the DOM
    const maskId = `mask-disabled-${_lastId++}`;
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        version='1.1' aria-label={a11yTitle}>
        <defs>
          <mask id={maskId}>
            <g className={`${CLASS_ROOT}__detail`} >
              <rect x='0' y='0' width='24' height='24' fill='#fff' />
              <path d='M6,12 L18,12' strokeWidth='2' stroke='#000' />
            </g>
          </mask>
        </defs>
        <g className={`${CLASS_ROOT}__base`} mask={`url(#${maskId})`}>
          <path stroke='none'
            d={'M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 ' +
              'L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 ' +
              'L21,24 Z'} />
        </g>
      </svg>
    );
  }
}

Disabled.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string
};

Disabled.defaultProps = {
  a11yTitle: 'Disabled'
};
