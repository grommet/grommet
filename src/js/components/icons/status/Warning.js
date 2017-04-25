// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

let _lastId = 0;

export default class Warning extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-warning`,
      className
    );
    // generate an id to avoid duplication in the DOM
    const maskId = `mask-warning-${_lastId++}`;
    return (
      <svg {...props} className={classes} viewBox="0 0 24 24" role="img"
        aria-label={a11yTitle} version="1.1">
        <defs>
          <mask id={maskId}>
            <g className={`${CLASS_ROOT}__detail`} >
              <rect x='0' y='0' width='24' height='24' fill='#fff' />
              <g strokeWidth="2" stroke='#000'
                transform="translate(11.000000, 8.000000)">
                <path role="presentation" d="M1,0 L1,6" fill="none" />
                <path role="presentation" d="M1,8 L1,10" fill="none" />
              </g>
            </g>
          </mask>
        </defs>
        <g className={`${CLASS_ROOT}__base`} mask={`url(#${maskId})`}>
          <path role="presentation" d="M12,0 L0,22 L24,22 L12,0 L12,0 Z"
            stroke="none" />
        </g>
      </svg>
    );
  }
}

Warning.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string
};

Warning.defaultProps = {
  a11yTitle: 'Warning'
};
