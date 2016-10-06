// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import Intl from '../../utils/Intl';

const CLASS_ROOT = CSSClassnames.SPINNING;

export default class Spinning extends Component {
  render () {
    const { a11yTitle, className, small, ...props } = this.props;
    const { intl } = this.context;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--small`]: small
      },
      className
    );

    return (
      <svg {...props} className={classes} viewBox='0 0 48 48' version='1.1'
        role='img' aria-label={a11yTitle || Intl.getMessage(intl, 'Spinning')}>
        <circle stroke='#ddd' strokeWidth='4' strokeDasharray='24px 8px'
          fill='none' cx='24' cy='24' r='20' />
        <circle stroke='#333' strokeWidth='4' strokeDasharray='24px 104px'
          fill='none' cx='24' cy='24' r='20' />
      </svg>
    );
  }
}

Spinning.contextTypes = {
  intl: PropTypes.object
};

Spinning.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool
};
