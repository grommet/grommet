// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import Intl from '../../utils/Intl';

const CLASS_ROOT = CSSClassnames.SPINNING;

export default class Spinning extends Component {
  render () {
    const {
      a11yTitle, className, small, size, responsive, ...props
    } = this.props;
    const { intl } = this.context;

    let sizeOverride = small ? 'small' : size;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${sizeOverride}`]: sizeOverride,
        [`${CLASS_ROOT}--responsive`]: responsive
      },
      className
    );

    return (
      <svg {...props} className={classes} viewBox='0 0 48 48' version='1.1'
        role='img' aria-label={a11yTitle || Intl.getMessage(intl, 'Spinning')}>
        <circle cx="24" cy="24" r="21"
          stroke="#979797" strokeWidth="6" fill="none" />
      </svg>
    );
  }
}

Spinning.contextTypes = {
  intl: PropTypes.object
};

Spinning.defaultProps = {
  responsive: true
};

Spinning.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};
