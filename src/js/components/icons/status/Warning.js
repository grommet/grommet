// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class Warning extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-warning`,
      className
    );
    return (
      <svg {...props} className={classes} viewBox="0 0 24 24" role="img"
        aria-label={a11yTitle} version="1.1">
        <g className={`${CLASS_ROOT}__base`}>
          <path role="presentation" d="M12,0 L0,22 L24,22 L12,0 L12,0 Z"
            stroke="none" />
        </g>
        <g className={`${CLASS_ROOT}__detail`} strokeWidth="2"
          transform="translate(11.000000, 8.000000)">
          <path role="presentation" d="M1,0 L1,6" fill="none" />
          <path role="presentation" d="M1,8 L1,10" fill="none" />
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
