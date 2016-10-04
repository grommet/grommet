// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class Unknown extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-unknown`,
      className
    );
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        aria-label={a11yTitle} version='1.1'>
        <g className={`${CLASS_ROOT}__base`}>
          <path
            d={'M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 ' +
              'C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 L12,2 Z M12,0 ' +
              'C5.4,0 0,5.4 0,12 C0,18.6 5.4,24 12,24 ' +
              'C18.6,24 24,18.6 24,12 C24,5.4 18.6,0 12,0 L12,0 L12,0 Z'}
              stroke='none' />
        </g>
        <g className={`${CLASS_ROOT}__detail`}>
          <path
            d={'M9,10.4 C9,8.8 10.4,7.6 12,7.6 C13.6,7.6 14.9,9 15,10.4 ' +
              'C15,11.7 14.1,12.7 12.9,13.1 C12.4,13.2 12,13.7 12,14.2 ' +
              'L12,15.5'} fill='none' strokeWidth='2' />
          <circle stroke='none' cx='12' cy='17.6' r='1' />
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
