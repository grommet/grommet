// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class Disabled extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-disabled`,
      className);
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        version='1.1' aria-label={a11yTitle}>
        <g className={`${CLASS_ROOT}__base`}>
          <path stroke='none'
            d={'M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 ' +
              'L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 ' +
              'L21,24 Z'} />
        </g>
        <g className={`${CLASS_ROOT}__detail`} strokeWidth='2'>
          <path d='M6,12 L18,12' />
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
