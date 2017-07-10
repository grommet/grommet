// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

let _lastId = 0;

export default class Unknown extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-unknown`,
      className
    );
    // generate an id to avoid duplication in the DOM
    const maskId = `mask-uknown-${_lastId++}`;
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        aria-label={a11yTitle} version='1.1'>
        <defs>
          <mask id={maskId}>
            <g className={`${CLASS_ROOT}__detail`} >
              <rect x='0' y='0' width='24' height='24' fill='#fff' />
              <circle cx='12' cy='12' r='10' stroke='none' fill='#000' />
              <path
                d={'M9,10.4 C9,8.8 10.4,7.6 12,7.6 C13.6,7.6 14.9,9 15,10.4 ' +
                  'C15,11.7 14.1,12.7 12.9,13.1 C12.4,13.2 12,13.7 12,14.2 ' +
                  'L12,15.5'} fill='none' strokeWidth='2' stroke='#fff' />
              <circle stroke='none' cx='12' cy='17.6' r='1' fill='#fff' />
            </g>
          </mask>
        </defs>
        <g className={`${CLASS_ROOT}__base`} mask={`url(#${maskId})`}>
          <circle className={`${CLASS_ROOT}__normal`}
            cx='12' cy='12' r='12' stroke='none' />
          <circle className={`${CLASS_ROOT}__small`}
            cx='12' cy='12' r='11' strokeWidth='3' fill='none' />
        </g>
      </svg>
    );
  }
}

Unknown.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string
};

Unknown.defaultProps = {
  a11yTitle: 'Unknown'
};
