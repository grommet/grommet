// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class OK extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-ok`,
      className
    );
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        aria-label={a11yTitle} version='1.1'>
        <g className={`${CLASS_ROOT}__base`}>
          <circle cx='12' cy='12' r='12' stroke='none' />
        </g>
        <g className={`${CLASS_ROOT}__detail`}>
          <path
            d={'M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 ' +
              'L10,17.4 Z'} stroke='none' />
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
