// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

let _lastId = 0;

export default class OK extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-ok`,
      className
    );
    // generate an id to avoid duplication in the DOM
    const maskId = `mask-ok-${_lastId++}`;
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        aria-label={a11yTitle} version='1.1'>
        <defs>
          <mask id={maskId}>
            <g className={`${CLASS_ROOT}__detail`} >
              <rect x='0' y='0' width='24' height='24' fill='#fff' />
              <path d={'M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 ' +
                'L18.7,8.7 L10,17.4 Z'} stroke='none' fill='#000' />
            </g>
          </mask>
        </defs>
        <g className={`${CLASS_ROOT}__base`} mask={`url(#${maskId})`}>
          <circle cx='12' cy='12' r='12' stroke='none' />
        </g>
      </svg>
    );
  }
}

OK.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string
};

OK.defaultProps = {
  a11yTitle: 'OK'
};
